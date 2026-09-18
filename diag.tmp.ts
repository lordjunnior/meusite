import { diagnoseAll } from "@/lib/intelligence/engine";
for (const d of diagnoseAll()) {
  console.log(d.cluster.id, d.type, `cov=${d.covered.length}/${d.cluster.children.length}`, "score", d.score.total, d.score.confidence, "cannibal", d.cannibalizationPaths.length);
  for (const u of d.uncovered) console.log("   x", u.label);
  for (const c of d.covered) console.log("   v", c.intent.label, "->", c.match.path, c.match.focusScore, c.match.semanticScore);
}
