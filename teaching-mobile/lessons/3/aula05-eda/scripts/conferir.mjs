import { readFileSync, existsSync } from "node:fs";

const files = ["app/index.tsx", "components/CartaoIndicador.tsx"];
const code = files.filter(existsSync).map(f => readFileSync(f,"utf8")).join("\n");
const checks = [["Image local", "Image"], ["Feedback pressed", "pressed"], ["Papel acessível", "accessibilityRole"], ["Nome acessível", "accessibilityLabel"], ["Alvo de toque explícito", "minHeight: 48"]];
let ok = 0;
console.log("\n=== CHECKPOINT FORMATIVO AULA 5 ===");
for (const [nome, token] of checks) {
  const pass = code.includes(token); if (pass) ok++;
  console.log(`${pass ? "✓" : "○"} ${nome}`);
}
console.log(`\nProgresso técnico indicativo: ${ok}/${checks.length}`);
console.log("Isto NÃO é nota e NÃO prova acessibilidade. Faça também o teste por pares e em celular.");
