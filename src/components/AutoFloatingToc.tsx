import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageFloatingToc, { type TocItem } from "./PageFloatingToc";

const MIN_SECTIONS = 4;
const MIN_SCREENS = 4;

function slug(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "secao";
}

function shortLabel(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 34) return clean;
  const cut = clean.slice(0, 34);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 16 ? cut.lastIndexOf(" ") : 34)}...`;
}

/** Sumário automático: monta o índice a partir dos títulos de seção das páginas longas que não têm sumário próprio. */
export default function AutoFloatingToc() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    setItems([]);
    if (pathname === "/" || pathname.startsWith("/admin")) return;
    const build = () => {
      if (document.querySelector("[data-page-toc]")) return setItems([]);
      if (document.documentElement.scrollHeight < window.innerHeight * MIN_SCREENS) return setItems([]);
      const used = new Set<string>();
      const found: TocItem[] = [];
      document.querySelectorAll<HTMLHeadingElement>("h2").forEach((h) => {
        const text = h.textContent?.trim();
        if (!text || h.closest("[aria-hidden='true'], footer, nav, aside, dialog, [role=dialog]")) return;
        const target = (h.closest("section[id]") as HTMLElement | null) ?? h;
        if (!target.id) {
          let id = slug(text);
          while (document.getElementById(id) || used.has(id)) id += "-2";
          target.id = id;
        }
        if (used.has(target.id)) return;
        used.add(target.id);
        target.style.scrollMarginTop ||= "6rem";
        found.push({ id: target.id, label: shortLabel(text), num: String(found.length + 1).padStart(2, "0") });
      });
      setItems(found.length >= MIN_SECTIONS ? found : []);
    };
    const timers = [700, 2000, 4000].map((ms) => window.setTimeout(build, ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  if (!items.length) return null;
  return <PageFloatingToc key={pathname} items={items} accentColor="amber" auto />;
}
