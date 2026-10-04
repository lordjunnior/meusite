# Project architecture
- Keep public editorial pages in `src/pages/`, register them in `src/App.tsx`, and link them through the existing navigation and search registries; this preserves the current Vite site architecture and discoverability.
- Keep the Mapa da Soberania's silo index editorial rather than treating link totals as published-page totals; redirects and repeated entries make those counts diverge.
- Reuse the existing `smx-page` token scope and EditorialKit for editorial page art direction; shared visual rules should stay consistent without changing the site's global shell.
- Keep source-verification editorial data separate from the page layout and scope its additional styles to that page; this keeps detailed content maintainable without changing other articles.
- Keep the tactical editorial page pattern as an unrouted reference module in `src/components/editorial/` documented in `docs/PADRAO_PAGINAS_TATICAS.md`; it travels with the repo without being exposed to visitors.
