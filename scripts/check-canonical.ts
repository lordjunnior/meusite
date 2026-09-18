/**
 * Guarda de domínio canônico.
 *
 * Roda antes do build. Se qualquer arquivo de src/ ou public/ voltar a
 * apontar canonical, og:url ou sitemap para um domínio que não seja o
 * oficial, o build para aqui em vez de entregar o sinal de SEO para fora.
 */
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const FORBIDDEN = [
  'sovereign-arsenal.lovable.app',
  'lordjunnior.lovable.app',
  'soberania.app',
  'despertarsoberano.com',
  'www.lordjunnior.com.br',
];

const FILES = execSync(
  "git ls-files 'src/**' 'public/**' 'index.html'",
  { encoding: 'utf8' },
)
  .split('\n')
  .filter(Boolean)
  .filter((f) => /\.(tsx?|jsx?|html|xml|txt|json|md)$/.test(f))
  .filter((f) => !f.endsWith('src/lib/site.ts'));

const offenders: string[] = [];

for (const file of FILES) {
  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  content.split('\n').forEach((line, i) => {
    for (const host of FORBIDDEN) {
      if (line.includes(host)) {
        offenders.push(`${file}:${i + 1}  ${host}`);
      }
    }
  });
}

if (offenders.length > 0) {
  console.error('\nDominio incorreto encontrado. Use SITE_URL de src/lib/site.ts.\n');
  offenders.forEach((o) => console.error('  ' + o));
  console.error(`\nTotal: ${offenders.length} ocorrencia(s).\n`);
  process.exit(1);
}

console.log('Canonical OK: todos os arquivos apontam para lordjunnior.com.br');

/**
 * Segunda guarda: toda pagina que define <title> precisa definir canonical.
 * Sem isso, cada pagina nova e uma chance de reintroduzir conteudo orfao.
 */
const semCanonical: string[] = [];

for (const file of FILES) {
  if (!/^src\/(pages|components)\/.+\.tsx$/.test(file)) continue;
  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (!content.includes('<Helmet')) continue;
  if (!content.includes('<title>')) continue;
  if (content.includes('name="robots" content="noindex"')) continue;
  if (content.includes('rel="canonical"')) continue;
  semCanonical.push(file);
}

if (semCanonical.length > 0) {
  console.error('\nPaginas com <title> e sem canonical. Use canonicalUrl() de src/lib/site.ts ou o componente SeoHead.\n');
  semCanonical.forEach((f) => console.error('  ' + f));
  console.error(`\nTotal: ${semCanonical.length} arquivo(s).\n`);
  process.exit(1);
}

console.log('Canonical OK: toda pagina indexavel declara a propria URL');
