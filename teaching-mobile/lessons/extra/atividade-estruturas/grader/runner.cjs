const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");
const ts = require("typescript");
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, "manifest.json"), "utf8"));
require.extensions[".ts"] = function carregarTypeScript(modulo, arquivo) {
    const codigo = fs.readFileSync(arquivo, "utf8");
    const compilado = ts.transpileModule(codigo, {
        fileName: arquivo,
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022,
            esModuleInterop: true,
            sourceMap: false,
            inlineSourceMap: false,
            inlineSources: false,
        },
    });
    modulo._compile(compilado.outputText, arquivo);
};
class Pendente extends Error {
}
class Incorreto extends Error {
}
function contemTodo(valor, visitados = new WeakSet()) {
    if (valor && typeof valor === "object" && valor.__ifmaTodo === true)
        return true;
    if (!valor || typeof valor !== "object")
        return false;
    if (visitados.has(valor))
        return false;
    visitados.add(valor);
    if (Array.isArray(valor))
        return valor.some((item) => contemTodo(item, visitados));
    if (valor instanceof Set)
        return [...valor].some((item) => contemTodo(item, visitados));
    if (valor instanceof Map) {
        return [...valor].some(([chave, item]) => contemTodo(chave, visitados) || contemTodo(item, visitados));
    }
    return Object.values(valor).some((item) => contemTodo(item, visitados));
}
function obter(executar) {
    let valor;
    try {
        valor = executar();
    }
    catch (_erro) {
        throw new Incorreto();
    }
    if (contemTodo(valor))
        throw new Pendente();
    return valor;
}
function confirmar(condicao) {
    if (!condicao)
        throw new Incorreto();
}
function iguais(a, b) {
    return util.isDeepStrictEqual(a, b);
}
function setIgual(atual, esperado) {
    return atual instanceof Set && atual.size === esperado.size && [...esperado].every((v) => atual.has(v));
}
function mapIgual(atual, esperado) {
    return atual instanceof Map && atual.size === esperado.size
        && [...esperado].every(([chave, valor]) => atual.has(chave) && Object.is(atual.get(chave), valor));
}
function gerador(seed) {
    let estado = 2166136261;
    for (const caractere of seed) {
        estado ^= caractere.charCodeAt(0);
        estado = Math.imul(estado, 16777619);
    }
    return () => {
        estado += 0x6D2B79F5;
        let t = estado;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function inteiro(rng, minimo, maximo) {
    return Math.floor(rng() * (maximo - minimo + 1)) + minimo;
}
const arquivoPorFase = {
    F01: "f01-tipos.ts",
    F02: "f02-array.ts",
    F03: "f03-lista.ts",
    F04: "f04-matriz.ts",
    F05: "f05-set.ts",
    F06: "f06-map.ts",
    F07: "f07-object-record.ts",
    F08: "f08-app-da-turma.ts",
};
function carregarFases() {
    const fases = {};
    for (const [fase, arquivo] of Object.entries(arquivoPorFase)) {
        const destino = path.join(ROOT, "src", "fases", arquivo);
        try {
            delete require.cache[require.resolve(destino)];
            fases[fase] = require(destino);
        }
        catch (_erro) {
            fases[fase] = null;
        }
    }
    return fases;
}
function novoNo(valor) {
    return { valor, proximo: null };
}
function novaMatriz(rng, linhas = 3, colunas = 3) {
    return Array.from({ length: linhas }, () => Array.from({ length: colunas }, () => inteiro(rng, 0, 100)));
}
function novoApp() {
    return {
        alunos: [],
        notasBimestrais: [],
        tecnologias: new Set(),
        notasPorAluno: new Map(),
    };
}
const testes = {
    "F01-A01": (m) => {
        const valor = obter(() => m.nome);
        confirmar(typeof valor === "string" && valor === "Ana");
    },
    "F01-A02": (m) => {
        const valor = obter(() => m.idade);
        confirmar(typeof valor === "number" && valor === 17);
    },
    "F01-A03": (m) => {
        const valor = obter(() => m.entregouAtividade);
        confirmar(typeof valor === "boolean" && valor === true);
    },
    "F02-A01": (m) => {
        const valor = obter(() => m.criarAlunos());
        confirmar(iguais(valor, ["Ana", "Bruno", "Carla"]));
    },
    "F02-A02": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F02-A02");
        for (let caso = 0; caso < 5; caso += 1) {
            const valores = Array.from({ length: 4 + caso }, (_, i) => "Aluno-" + caso + "-" + i + "-" + inteiro(rng, 10, 99));
            const indice = inteiro(rng, 0, valores.length - 1);
            confirmar(obter(() => m.obterAluno(valores, indice)) === valores[indice]);
        }
    },
    "F02-A03": (m) => {
        const casos = [["Lia"], ["Ravi", "Bia"], ["Caio", "Iara", "Noa"], ["Mara", "Luz", "Ian", "Yas"]];
        for (const valores of casos)
            confirmar(obter(() => m.primeiroAluno(valores)) === valores[0]);
    },
    "F02-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F02-A04");
        for (let caso = 0; caso < 4; caso += 1) {
            const notas = Array.from({ length: 5 }, () => inteiro(rng, 0, 10));
            const antes = [...notas];
            const indice = inteiro(rng, 0, 4);
            const novaNota = inteiro(rng, 20, 30);
            const retorno = obter(() => m.alterarNota(notas, indice, novaNota));
            confirmar(retorno === notas && notas[indice] === novaNota);
            confirmar(notas.every((valor, i) => i === indice || valor === antes[i]));
        }
    },
    "F02-A05": (m) => {
        for (const tamanho of [0, 1, 3, 7, 11]) {
            const valores = Array.from({ length: tamanho }, (_, i) => "A" + i);
            confirmar(obter(() => m.quantidadeDeAlunos(valores)) === tamanho);
        }
    },
    "F02-A06": (m) => {
        for (const [base, nome] of [[[], "Ana"], [["Bia"], "Caio"], [["Davi", "Eva"], "Fê"], [["Gabi", "Hugo", "Iara"], "Jo"]]) {
            const alunos = [...base];
            const retorno = obter(() => m.adicionarAluno(alunos, nome));
            confirmar(retorno === alunos && alunos.length === base.length + 1 && alunos.at(-1) === nome);
        }
    },
    "F03-A01": (m) => {
        for (const [a, b] of [["Ana", "Bruno"], ["Lia", "Noa"], ["Ravi", "Bia"], ["Iara", "Caio"]]) {
            const primeiro = novoNo(a);
            const segundo = novoNo(b);
            const retorno = obter(() => m.conectar(primeiro, segundo));
            confirmar(retorno === primeiro && primeiro.proximo === segundo && segundo.proximo === null);
        }
    },
    "F03-A02": (m) => {
        for (const nomes of [["Ana", "Bruno", "Carla"], ["Davi", "Eva", "Fê"], ["Gabi", "Hugo", "Iara"]]) {
            const nos = nomes.map(novoNo);
            const retorno = obter(() => m.formarTrio(nos[0], nos[1], nos[2]));
            confirmar(retorno === nos[0] && nos[0].proximo === nos[1] && nos[1].proximo === nos[2]);
        }
    },
    "F03-A03": (m) => {
        for (const [inicioValor, novoValor] of [["Bruno", "Ana"], ["Noa", "Lia"], ["Bia", "Ravi"], ["Caio", "Iara"]]) {
            const inicio = novoNo(inicioValor);
            const retorno = obter(() => m.inserirNoInicio(inicio, novoValor));
            confirmar(retorno !== inicio && retorno.valor === novoValor && retorno.proximo === inicio);
        }
    },
    "F03-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F03-A04");
        for (let caso = 0; caso < 5; caso += 1) {
            const valores = Array.from({ length: 5 + caso }, (_, i) => "V" + caso + "-" + i);
            const indice = inteiro(rng, 0, valores.length - 1);
            confirmar(obter(() => m.acessoDireto(valores, indice)) === valores[indice]);
        }
    },
    "F03-A05": (m) => {
        for (const nomes of [["Ana", "Bruno", "Carla", "Diego"], ["Lia", "Noa", "Bia", "Ravi", "Iara"], ["Um", "Dois", "Três", "Quatro", "Cinco", "Seis"]]) {
            const nos = nomes.map(novoNo);
            for (let i = 0; i < nos.length - 1; i += 1)
                nos[i].proximo = nos[i + 1];
            confirmar(obter(() => m.quartoPorPercurso(nos[0])) === nomes[3]);
        }
        const curto = novoNo("Único");
        confirmar(obter(() => m.quartoPorPercurso(curto)) === undefined);
    },
    "F04-A01": (m) => {
        const valor = obter(() => m.criarMatrizExemplo());
        confirmar(iguais(valor, [[8, 9], [7, 8], [9, 10]]));
    },
    "F04-A02": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F04-A02");
        for (let caso = 0; caso < 6; caso += 1) {
            const matriz = novaMatriz(rng, 2 + (caso % 3), 2 + ((caso + 1) % 3));
            const linha = inteiro(rng, 0, matriz.length - 1);
            const coluna = inteiro(rng, 0, matriz[0].length - 1);
            confirmar(obter(() => m.obterNota(matriz, linha, coluna)) === matriz[linha][coluna]);
        }
    },
    "F04-A03": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F04-A03");
        for (let caso = 0; caso < 4; caso += 1) {
            const matriz = novaMatriz(rng, 3 + caso, 2);
            const linha = caso % matriz.length;
            confirmar(obter(() => m.obterLinha(matriz, linha)) === matriz[linha]);
        }
    },
    "F04-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F04-A04");
        for (let caso = 0; caso < 5; caso += 1) {
            const matriz = novaMatriz(rng, 3, 4);
            const antes = matriz.map((linha) => [...linha]);
            const linha = inteiro(rng, 0, 2);
            const coluna = inteiro(rng, 0, 3);
            const novaNota = inteiro(rng, 200, 300);
            const retorno = obter(() => m.alterarCelula(matriz, linha, coluna, novaNota));
            confirmar(retorno === matriz && matriz[linha][coluna] === novaNota);
            for (let l = 0; l < matriz.length; l += 1) {
                for (let c = 0; c < matriz[l].length; c += 1) {
                    if (l !== linha || c !== coluna)
                        confirmar(matriz[l][c] === antes[l][c]);
                }
            }
        }
    },
    "F04-A05": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F04-A05");
        for (const [linhas, colunas] of [[1, 1], [2, 4], [4, 2], [5, 3]]) {
            const matriz = novaMatriz(rng, linhas, colunas);
            confirmar(iguais(obter(() => m.dimensoes(matriz)), [linhas, colunas]));
        }
    },
    "F05-A01": (m) => {
        const valor = obter(() => m.criarTecnologias());
        confirmar(setIgual(valor, new Set(["JavaScript", "TypeScript", "React"])));
    },
    "F05-A02": (m) => {
        for (const [base, novo] of [[["JS"], "TS"], [["Web", "Mobile"], "Web"], [[], "Dados"], [["A", "B", "C"], "D"], [["X"], "X"]]) {
            const conjunto = new Set(base);
            const tamanhoEsperado = conjunto.has(novo) ? conjunto.size : conjunto.size + 1;
            const retorno = obter(() => m.adicionarTecnologia(conjunto, novo));
            confirmar(retorno === conjunto && conjunto.has(novo) && conjunto.size === tamanhoEsperado);
        }
    },
    "F05-A03": (m) => {
        for (const valores of [[], ["A"], ["A", "B"], ["A", "B", "C", "D"], ["X", "Y", "Z", "W", "Q"]]) {
            const conjunto = new Set(valores);
            confirmar(obter(() => m.quantidadeUnica(conjunto)) === conjunto.size);
        }
    },
    "F05-A04": (m) => {
        const casos = [
            ["A", "A", "B"], ["JS", "TS", "JS", "React"], [], ["1", "2", "1", "3", "2"],
            ["MA", "PA", "MA", "PI", "PA"], ["Web", "Mobile", "Dados", "Web", "IA"],
        ];
        for (const valores of casos) {
            const retorno = obter(() => m.semDuplicatas([...valores]));
            confirmar(setIgual(retorno, new Set(valores)));
        }
    },
    "F06-A01": (m) => {
        const valor = obter(() => m.criarNotasPorAluno());
        confirmar(mapIgual(valor, new Map([["Ana", 8.5], ["Bruno", 7], ["Carla", 9]])));
    },
    "F06-A02": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F06-A02");
        for (let caso = 0; caso < 5; caso += 1) {
            const notas = new Map([["Base", 1]]);
            const nome = "Aluno-" + caso;
            const nota = inteiro(rng, 0, 100) / 10;
            const retorno = obter(() => m.registrarNota(notas, nome, nota));
            confirmar(retorno === notas && notas.get(nome) === nota);
        }
    },
    "F06-A03": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F06-A03");
        for (let caso = 0; caso < 6; caso += 1) {
            const pares = Array.from({ length: 4 }, (_, i) => ["N" + caso + "-" + i, inteiro(rng, 0, 100) / 10]);
            const indice = inteiro(rng, 0, pares.length - 1);
            confirmar(obter(() => m.consultarNota(new Map(pares), pares[indice][0])) === pares[indice][1]);
        }
    },
    "F06-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F06-A04");
        for (let caso = 0; caso < 5; caso += 1) {
            const nome = "Pessoa-" + caso;
            const notas = new Map([[nome, 1], ["Outra", 2]]);
            const novaNota = inteiro(rng, 30, 100) / 10;
            const retorno = obter(() => m.atualizarNota(notas, nome, novaNota));
            confirmar(retorno === notas && notas.size === 2 && notas.get(nome) === novaNota);
        }
    },
    "F06-A05": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F06-A05");
        for (let caso = 0; caso < 4; caso += 1) {
            const nomes = [0, 1, 2].map((i) => "K" + caso + "-" + i);
            const notas = [0, 1, 2].map(() => inteiro(rng, 0, 100) / 10);
            const retorno = obter(() => m.mapearTresNotas(nomes[0], notas[0], nomes[1], notas[1], nomes[2], notas[2]));
            confirmar(mapIgual(retorno, new Map(nomes.map((nome, i) => [nome, notas[i]]))));
        }
    },
    "F07-A01": (m) => {
        const casos = [["Ana", 17, true], ["Bruno", 16, false], ["Carla", 18, true], ["Davi", 15, false], ["Eva", 17, true]];
        for (const [nome, idade, entregou] of casos) {
            const retorno = obter(() => m.criarAluno(nome, idade, entregou));
            confirmar(iguais(retorno, { nome, idade, entregouAtividade: entregou }));
        }
    },
    "F07-A02": (m) => {
        for (const nome of ["Ana", "Bruno", "Carla", "Davi", "Eva"]) {
            confirmar(obter(() => m.nomeDoAluno({ nome, idade: 17, entregouAtividade: true })) === nome);
        }
    },
    "F07-A03": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F07-A03");
        for (let caso = 0; caso < 5; caso += 1) {
            const nome1 = "A-" + caso;
            const nome2 = "B-" + caso;
            const nota1 = inteiro(rng, 0, 100) / 10;
            const nota2 = inteiro(rng, 0, 100) / 10;
            const retorno = obter(() => m.criarRegistroNotas(nome1, nota1, nome2, nota2));
            confirmar(iguais(retorno, { [nome1]: nota1, [nome2]: nota2 }));
        }
    },
    "F07-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F07-A04");
        for (let caso = 0; caso < 6; caso += 1) {
            const registro = {};
            for (let i = 0; i < 4; i += 1)
                registro["R" + caso + "-" + i] = inteiro(rng, 0, 100) / 10;
            const chave = "R" + caso + "-" + (caso % 4);
            confirmar(obter(() => m.consultarRegistro(registro, chave)) === registro[chave]);
        }
    },
    "F08-A01": (m) => {
        const apps = [0, 1, 2].map(() => obter(() => m.criarAppDaTurma()));
        for (const app of apps) {
            confirmar(app && Array.isArray(app.alunos) && app.alunos.length === 0);
            confirmar(Array.isArray(app.notasBimestrais) && app.notasBimestrais.length === 0);
            confirmar(app.tecnologias instanceof Set && app.tecnologias.size === 0);
            confirmar(app.notasPorAluno instanceof Map && app.notasPorAluno.size === 0);
        }
        confirmar(apps[0] !== apps[1] && apps[0].alunos !== apps[1].alunos);
    },
    "F08-A02": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F08-A02");
        for (let caso = 0; caso < 4; caso += 1) {
            const app = novoApp();
            app.alunos.push({ nome: "Existente", idade: 18 });
            app.notasBimestrais.push([5, 6]);
            const aluno = { nome: "Novo-" + caso, idade: 15 + caso };
            const notas = [inteiro(rng, 0, 10), inteiro(rng, 0, 10)];
            const retorno = obter(() => m.adicionarAluno(app, aluno, notas));
            confirmar(retorno === app && app.alunos.at(-1) === aluno && app.notasBimestrais.at(-1) === notas);
            confirmar(app.alunos.length === 2 && app.notasBimestrais.length === 2);
        }
    },
    "F08-A03": (m) => {
        for (const tecnologia of ["JavaScript", "TypeScript", "React", "Node", "Dados"]) {
            const app = novoApp();
            app.tecnologias.add("Base");
            const retorno = obter(() => m.registrarTecnologia(app, tecnologia));
            confirmar(retorno === app && app.tecnologias.has(tecnologia));
            const tamanho = app.tecnologias.size;
            obter(() => m.registrarTecnologia(app, tecnologia));
            confirmar(app.tecnologias.size === tamanho);
        }
    },
    "F08-A04": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F08-A04");
        for (let caso = 0; caso < 5; caso += 1) {
            const app = novoApp();
            const nome = "Aluno-" + caso;
            const media = inteiro(rng, 0, 100) / 10;
            const retorno = obter(() => m.registrarMedia(app, nome, media));
            confirmar(retorno === app && app.notasPorAluno.get(nome) === media);
        }
    },
    "F08-A05": (m) => {
        const rng = gerador("IFMA-ESTRUTURAS-LAB:F08-A05");
        for (let caso = 0; caso < 6; caso += 1) {
            const app = novoApp();
            app.alunos = Array.from({ length: 3 }, (_, i) => ({ nome: "Pessoa-" + caso + "-" + i, idade: 15 + i }));
            app.notasBimestrais = novaMatriz(rng, 3, 2);
            for (const aluno of app.alunos)
                app.notasPorAluno.set(aluno.nome, inteiro(rng, 0, 100) / 10);
            const indice = caso % 3;
            const bimestre = caso % 2;
            const aluno = app.alunos[indice];
            const esperado = { aluno, nota: app.notasBimestrais[indice][bimestre], media: app.notasPorAluno.get(aluno.nome) };
            confirmar(iguais(obter(() => m.consultarPainel(app, indice, bimestre)), esperado));
        }
    },
};
function executarTudo() {
    const modulos = carregarFases();
    const resultados = MANIFEST.tasks.map((meta) => {
        const modulo = modulos[meta.phase];
        if (!modulo || typeof testes[meta.id] !== "function") {
            return { ...meta, status: "fail" };
        }
        try {
            testes[meta.id](modulo);
            return { ...meta, status: "pass" };
        }
        catch (erro) {
            if (erro instanceof Pendente)
                return { ...meta, status: "pending" };
            return { ...meta, status: "fail" };
        }
    });
    const score = resultados.filter((r) => r.status === "pass").reduce((s, r) => s + r.xp, 0);
    const phaseScores = {};
    for (const fase of MANIFEST.phases) {
        phaseScores[fase.id] = resultados
            .filter((r) => r.phase === fase.id && r.status === "pass")
            .reduce((s, r) => s + r.xp, 0);
    }
    return { score, total: MANIFEST.totalXp, phaseScores, results: resultados };
}
function barra(score, total) {
    const largura = 24;
    const cheios = Math.floor((score / total) * largura);
    return "█".repeat(cheios) + "░".repeat(largura - cheios);
}
function indiceAtual(relatorio) {
    const indice = MANIFEST.phases.findIndex((fase) => relatorio.phaseScores[fase.id] < fase.xp);
    return indice === -1 ? MANIFEST.phases.length : indice;
}
function imprimirStatus(relatorio) {
    const atual = indiceAtual(relatorio);
    console.log("╔══════════════════════════════════════════╗");
    console.log("║ IFMA • LABORATÓRIO DE ESTRUTURAS        ║");
    console.log("╚══════════════════════════════════════════╝\n");
    MANIFEST.phases.forEach((fase, indice) => {
        const pontos = relatorio.phaseScores[fase.id];
        const icone = pontos === fase.xp ? "✅" : indice === atual ? "🔓" : "🔒";
        const placar = indice <= atual || pontos === fase.xp ? " " + pontos + "/" + fase.xp : "";
        console.log(fase.id + " " + icone + placar + "  " + fase.title);
    });
    console.log("\nTOTAL: " + relatorio.score + " / " + relatorio.total + " XP");
    console.log(barra(relatorio.score, relatorio.total) + " " + Math.floor(relatorio.score / relatorio.total * 100) + "%\n");
    const obtidos = MANIFEST.badges.filter((b) => relatorio.score >= b.xp);
    if (obtidos.length > 0) {
        console.log("Conquistas:");
        for (const badge of obtidos)
            console.log("  " + badge.icon + " " + badge.title);
        console.log("");
    }
    const proximo = relatorio.results.find((r) => r.status !== "pass" && r.phase === MANIFEST.phases[atual]?.id);
    if (proximo) {
        console.log("Próximo: " + proximo.file + " → " + proximo.id);
        console.log("Dica: npm run dica -- " + proximo.id);
    }
    else if (relatorio.score === relatorio.total) {
        console.log("🏆 App da Turma concluído. 1000 XP!");
    }
}
function imprimirCheck(relatorio) {
    const atual = indiceAtual(relatorio);
    console.log("╔══════════════════════════════════════════╗");
    console.log("║ IFMA • LABORATÓRIO DE ESTRUTURAS        ║");
    console.log("╚══════════════════════════════════════════╝");
    for (let indice = 0; indice < MANIFEST.phases.length; indice += 1) {
        const fase = MANIFEST.phases[indice];
        if (indice > atual)
            continue;
        const resultados = relatorio.results.filter((r) => r.phase === fase.id);
        console.log("\n" + fase.id + " — " + fase.title.toUpperCase());
        for (const item of resultados) {
            if (item.status === "pass") {
                console.log("✅ " + item.id + "  " + item.title + "  +" + item.xp + " XP");
            }
            else if (item.status === "pending") {
                console.log("⬜ " + item.id + "  ainda não implementado");
            }
            else {
                console.log("❌ " + item.id + "  ainda não.");
                console.log("   " + item.feedback);
                console.log("   💡 Revise: " + item.concept);
                console.log("   Dica adicional: npm run dica -- " + item.id);
            }
        }
        const pontos = relatorio.phaseScores[fase.id];
        console.log("Fase: " + pontos + " / " + fase.xp + " XP");
        if (pontos === fase.xp) {
            console.log("══════════════════════════════════════════");
            console.log("🏅 " + fase.id + " CONCLUÍDA — " + fase.shortTitle);
            const proxima = MANIFEST.phases[indice + 1];
            if (proxima)
                console.log("Próxima fase desbloqueada: " + proxima.id + " — " + proxima.title);
            console.log("══════════════════════════════════════════");
        }
    }
    console.log("");
    imprimirStatus(relatorio);
}
function main(args = process.argv.slice(2)) {
    const relatorio = executarTudo();
    if (args.includes("--json")) {
        console.log(JSON.stringify(relatorio));
        return;
    }
    if (args.includes("--status"))
        imprimirStatus(relatorio);
    else
        imprimirCheck(relatorio);
}
if (require.main === module)
    main();
module.exports = { executarTudo, imprimirStatus, main };
