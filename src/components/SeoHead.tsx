import { Helmet } from 'react-helmet-async';
import { SEO_DATA, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, generateSchemas, getLsiMetaKeywords } from '@/lib/seoData';
import type { SeoPageData } from '@/lib/seoData';
import { canonicalUrl, absoluteUrl } from '@/lib/site';

interface SeoHeadProps {
  /** Route path e.g. '/bitcoin' — will lookup from SEO_DATA */
  path?: string;
  /** Override with custom data (merges with lookup) */
  custom?: Partial<SeoPageData>;
  /** Additional FAQ items for FAQPage schema */
  faqItems?: { question: string; answer: string }[];
  /** Include Organization schema (only on homepage) */
  includeOrgSchema?: boolean;
  /** Include WebSite schema (only on homepage) */
  includeWebsiteSchema?: boolean;
}

/**
 * SeoHead — Componente centralizado de SEO Semântico
 * 
 * Gera automaticamente:
 * - <title> com PNL e CTR otimizado
 * - Meta description com gatilho emocional
 * - Meta keywords LSI (Latent Semantic Indexing)
 * - Canonical URL
 * - Open Graph tags
 * - Twitter Card tags
 * - JSON-LD schemas (Article, HowTo, FAQPage, BreadcrumbList, etc.)
 * - Breadcrumb schema
 * - FAQ schema (quando fornecido)
 */
export default function SeoHead({ 
  path, 
  custom, 
  faqItems, 
  includeOrgSchema = false, 
  includeWebsiteSchema = false 
}: SeoHeadProps) {
  const lookupData = path ? SEO_DATA[path] : undefined;
  
  if (!lookupData && !custom) return null;

  const data: SeoPageData = {
    ...(lookupData || {
      title: '',
      description: '',
      canonical: '',
      primaryKeyword: '',
      lsiKeywords: [],
      longTailKeywords: [],
      breadcrumbs: [],
      schemaType: 'WebPage',
    }),
    ...custom,
  };

  const schemas = generateSchemas(data);

  // FAQ Schema
  if (faqItems && faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  // Canonical e og:url sempre normalizados para o dominio oficial (src/lib/site.ts)
  const canonical = canonicalUrl(data.canonical);
  const ogImage = absoluteUrl(data.ogImage || '/og-image.png');

  return (
    <Helmet>
      {/* Title with PNL CTR */}
      <title>{data.title}</title>
      
      {/* Meta Description — gatilho emocional */}
      <meta name="description" content={data.description} />
      
      {/* LSI Keywords (Semantic SEO) */}
      <meta name="keywords" content={getLsiMetaKeywords(data)} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonical} />
      
      {/* Language */}
      <html lang="pt-BR" />
      
      {/* Open Graph */}
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={data.schemaType === 'Article' || data.schemaType === 'TechArticle' ? 'article' : 'website'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Lord Junnior" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article-specific OG */}
      {data.articleSection && <meta property="article:section" content={data.articleSection} />}
      {data.schemaType === 'Article' && <meta property="article:author" content="Lord Junnior" />}
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
      
      {/* Organization Schema (homepage only) */}
      {includeOrgSchema && (
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      )}
      
      {/* WebSite Schema (homepage only) */}
      {includeWebsiteSchema && (
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
      )}
    </Helmet>
  );
}
