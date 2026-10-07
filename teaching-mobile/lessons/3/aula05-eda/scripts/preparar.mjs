import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if ((r.status ?? 1) !== 0) process.exit(r.status ?? 1);
}

console.log("[Aula 5] Preparando dependências...");
if (existsSync("package-lock.json")) run("npm", ["ci"]);
else run("npm", ["install"]);
run("npm", ["run", "doctor"]);
run("npm", ["run", "typecheck"]);
console.log("[OK] Ambiente preparado. Agora use: npm run web ou npm start");
