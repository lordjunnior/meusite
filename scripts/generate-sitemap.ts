// Gera public/sitemap.xml a partir das rotas reais de src/App.tsx.
// Roda automaticamente nos hooks predev/prebuild.

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://lordjunnior.com.br";

const app = readFileSync(resolve("src/App.tsx"), "utf-8");

const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<([A-Za-z0-9_]+)/g;

const excludedComponents = new Set(["LegacyRedirect", "Navigate", "NotFound"]);
const excludedPaths = new Set(["*"]);

const paths = new Set<string>();
for (const m of app.matchAll(routeRe)) {
  const [, path, component] = m;
  if (excludedComponents.has(component)) continue;
  if (excludedPaths.has(path)) continue;
  if (path.includes(":") || path.includes("*")) continue;
  paths.add(path);
}

// Rotas dinâmicas de plantas: /soberania-organica/planta/:slug
try {
  const plantData = readFileSync(resolve("src/lib/plantData.ts"), "utf-8");
  const canonicalMap = readFileSync(resolve("src/lib/plantaCanonical.ts"), "utf-8");
  const comFichaDedicada = new Set(
    [...canonicalMap.matchAll(/^\s*'?([a-z0-9-]+)'?:\s*'/gm)].map((m) => m[1]),
  );
  for (const m of plantData.matchAll(/slug:\s*'([a-z0-9-]+)'/g)) {
    if (comFichaDedicada.has(m[1])) continue; // duplicata da ficha dedicada
    paths.add(`/soberania-organica/planta/${m[1]}`);
  }
} catch {
  // sem dados de plantas, segue o baile
}

function priorityFor(path: string) {
  if (path === "/") return "1.0";
  const depth = path.split("/").filter(Boolean).length;
  if (depth === 1) return "0.9";
  if (depth === 2) return "0.8";
  return "0.7";
}

function changefreqFor(path: string) {
  return path === "/" ? "weekly" : "monthly";
}

const entries = [...paths].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const urls = entries.map((path) =>
  [
    "  <url>",
    `    <loc>${BASE_URL}${path === "/" ? "/" : path}</loc>`,
    `    <changefreq>${changefreqFor(path)}</changefreq>`,
    `    <priority>${priorityFor(path)}</priority>`,
    "  </url>",
  ].join("\n"),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml + "\n");
console.log(`sitemap.xml gerado (${entries.length} URLs)`);
