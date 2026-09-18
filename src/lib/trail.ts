import { navGroups, topNavItems, type NavItem } from "@/lib/sidebarNavigation";

export interface TrailStep {
  label: string;
  route: string;
}

export interface TrailInfo {
  /** Nome do silo ao qual a rota atual pertence */
  groupLabel: string;
  /** Rótulo da página atual */
  currentLabel: string;
  /** Posição da página dentro do silo, começando em 1 */
  index: number;
  /** Total de páginas do silo */
  total: number;
  prev?: TrailStep;
  next?: TrailStep;
}

function normalize(path: string): string {
  if (!path) return "/";
  const clean = path.split("?")[0].split("#")[0].toLowerCase();
  return clean.length > 1 ? clean.replace(/\/+$/, "") : "/";
}

/**
 * Descobre em qual silo a rota atual vive e devolve a trilha completa:
 * posição, total, anterior e próxima página.
 * A ordem segue exatamente a ordem da barra lateral.
 */
export function getTrail(pathname: string): TrailInfo | null {
  const current = normalize(pathname);
  if (current === "/") return null;

  for (const group of navGroups) {
    const steps: TrailStep[] = group.items
      .filter((item: NavItem) => Boolean(item.route))
      .map((item) => ({ label: item.label, route: normalize(item.route!) }));

    const index = steps.findIndex((step) => step.route === current);
    if (index === -1) continue;

    return {
      groupLabel: group.label,
      currentLabel: steps[index].label,
      index: index + 1,
      total: steps.length,
      prev: index > 0 ? steps[index - 1] : undefined,
      next: index < steps.length - 1 ? steps[index + 1] : undefined,
    };
  }

  const top = topNavItems.find((item) => item.route && normalize(item.route) === current);
  if (top) {
    return {
      groupLabel: "Navegação",
      currentLabel: top.label,
      index: 1,
      total: 1,
    };
  }

  return null;
}
