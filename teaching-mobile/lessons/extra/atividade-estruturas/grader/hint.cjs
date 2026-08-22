const fs = require("node:fs");
const path = require("node:path");
const id = String(process.argv[2] || "").toUpperCase();
const nivelTexto = String(process.argv[3] || "1");
const nivel = Number(nivelTexto);
if (!/^F\d{2}-A\d{2}$/.test(id) || ![1, 2, 3].includes(nivel)) {
    console.log("Uso: npm run dica -- <ID> [1|2|3]");
    console.log("Exemplo: npm run dica -- F04-A02 2");
    process.exitCode = 1;
}
else {
    const fase = id.slice(0, 3).toLowerCase();
    const arquivo = path.join(__dirname, "..", "dicas", fase + ".md");
    try {
        const texto = fs.readFileSync(arquivo, "utf8");
        const bloco = texto.match(new RegExp("## " + id + "\\n([\\s\\S]*?)(?=\\n## |$)"));
        if (!bloco)
            throw new Error("sem bloco");
        const linhas = bloco[1].split("\n").filter((linha) => /^- DICA [123] — /.test(linha));
        const dica = linhas[nivel - 1]?.replace(/^- DICA [123] — /, "");
        if (!dica)
            throw new Error("sem nível");
        console.log("💡 " + id + " — DICA " + nivel + "\n");
        console.log(dica);
        if (nivel < 3)
            console.log("\nMais direção: npm run dica -- " + id + " " + (nivel + 1));
    }
    catch (_erro) {
        console.log("Não encontrei uma dica para " + id + ".");
        process.exitCode = 1;
    }
}
