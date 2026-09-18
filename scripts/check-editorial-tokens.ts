import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const files = [
  "src/components/plantas/PlantaIndividualLayout.tsx",
  "src/components/protocolo-respiratorio/ProtocoloItemLayout.tsx",
  "src/components/FutureStateSection.tsx",
];

const forbidden = [
  "#f4ede4",
  "#ece2d3",
  "#faf6f0",
  "#0e3b3a",
  "#1a4a48",
  "#c4632a",
  "#e8a36b",
  "#ffb37a",
];

const failures = files.flatMap((file) => {
  const source = readFileSync(resolve(file), "utf8").toLowerCase();
  return forbidden.filter((color) => source.includes(color)).map((color) => `${file}: ${color}`);
});

if (failures.length > 0) {
  console.error("Use os tokens editoriais, não as cores-base literais:\n" + failures.join("\n"));
  process.exit(1);
}

console.log("tokens editoriais verificados");