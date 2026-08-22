"use strict";
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
function listarTs(diretorio) {
  return fs.readdirSync(diretorio, { withFileTypes: true }).flatMap((entrada) => {
    const destino = path.join(diretorio, entrada.name);
    if (entrada.isDirectory()) return listarTs(destino);
    return entrada.isFile() && entrada.name.endsWith(".ts") ? [destino] : [];
  });
}

const configPath = path.join(root, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) {
  console.log("❌ Não foi possível ler tsconfig.json.");
  process.exitCode = 1;
} else {
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
  const arquivos = listarTs(path.join(root, "src"));
  const programa = ts.createProgram({ rootNames: arquivos, options: { ...parsed.options, noEmit: true } });
  const diagnosticos = ts.getPreEmitDiagnostics(programa);
  if (diagnosticos.length === 0) {
    console.log("✅ TYPECHECK: PASS");
    console.log("Os arquivos TypeScript estão consistentes.");
  } else {
    console.log("❌ TYPECHECK: FAIL\n");
    const vistos = new Set();
    for (const diagnostico of diagnosticos.slice(0, 8)) {
      const arquivo = diagnostico.file?.fileName ? path.relative(root, diagnostico.file.fileName) : "configuração";
      const posicao = diagnostico.file && diagnostico.start !== undefined
        ? diagnostico.file.getLineAndCharacterOfPosition(diagnostico.start).line + 1
        : undefined;
      const chave = arquivo + ":" + (posicao || "?");
      if (vistos.has(chave)) continue;
      vistos.add(chave);
      console.log("• " + arquivo + (posicao ? " — linha " + posicao : ""));
      console.log("  Revise o tipo declarado e o valor usado nesse ponto. Código TS" + diagnostico.code + ".");
    }
    if (diagnosticos.length > 8) console.log("\nHá outros problemas; corrija estes primeiros e execute novamente.");
    process.exitCode = 1;
  }
}
