"use strict";
const fs = require("node:fs");
const path = require("node:path");
const child = require("node:child_process");

const root = path.resolve(__dirname, "..");
const checks = [];
function check(label, condition, detail = "") {
  checks.push({ label, ok: Boolean(condition), detail });
}

const nodeMajor = Number(process.versions.node.split(".")[0]);
check("Node.js 20 ou superior", nodeMajor >= 20, process.versions.node);

const npmResult = child.spawnSync("npm", ["--version"], { encoding: "utf8", shell: process.platform === "win32" });
check("npm disponível", npmResult.status === 0, (npmResult.stdout || "").trim());

try {
  const pacote = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  check("package.json", Boolean(pacote.scripts?.check && pacote.scripts?.typecheck));
} catch (_erro) {
  check("package.json", false);
}

try {
  const config = JSON.parse(fs.readFileSync(path.join(root, "tsconfig.json"), "utf8"));
  check("tsconfig.json", config.compilerOptions?.strict === true && config.compilerOptions?.noEmit === true);
} catch (_erro) {
  check("tsconfig.json", false);
}

try {
  require.resolve("typescript", { paths: [root] });
  check("TypeScript instalado", true);
} catch (_erro) {
  check("TypeScript instalado", false, "execute npm ci");
}

const obrigatorios = [
  "atividades", "src/fases", "src/lib/todo.ts", "dicas", "grader/runner.cjs",
  "grader/status.cjs", "grader/hint.cjs", "grader/manifest.json", "scripts/typecheck.cjs",
];
for (const item of obrigatorios) check(item, fs.existsSync(path.join(root, item)));

console.log("IFMA • Diagnóstico do laboratório\n");
for (const item of checks) {
  console.log((item.ok ? "✅" : "❌") + " " + item.label + (item.detail ? " — " + item.detail : ""));
}
const passou = checks.every((item) => item.ok);
console.log("\nDOCTOR: " + (passou ? "PASS" : "FAIL"));
if (!passou) process.exitCode = 1;
