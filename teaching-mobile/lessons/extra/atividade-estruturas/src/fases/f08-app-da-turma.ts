/**
 * F08 — Missão final: App da Turma
 * Os dados poderão alimentar uma interface Web/Mobile mais adiante.
 * Edite somente os TODOs deste arquivo.
 * Verificação: npm run check
 */
import { TODO } from "../lib/todo";

export type AlunoApp = {
  nome: string;
  idade: number;
};

export type AppDaTurma = {
  alunos: AlunoApp[];
  notasBimestrais: number[][];
  tecnologias: Set<string>;
  notasPorAluno: Map<string, number>;
};

export type PainelAluno = {
  aluno: AlunoApp;
  nota: number;
  media: number | undefined;
};

// TODO F08-A01
export function criarAppDaTurma(): AppDaTurma {
  return TODO<AppDaTurma>("F08-A01");
}

// TODO F08-A02
export function adicionarAluno(
  app: AppDaTurma,
  aluno: AlunoApp,
  notas: number[],
): AppDaTurma {
  return TODO<AppDaTurma>("F08-A02");
}

// TODO F08-A03
export function registrarTecnologia(app: AppDaTurma, tecnologia: string): AppDaTurma {
  return TODO<AppDaTurma>("F08-A03");
}

// TODO F08-A04
export function registrarMedia(app: AppDaTurma, nome: string, media: number): AppDaTurma {
  return TODO<AppDaTurma>("F08-A04");
}

// TODO F08-A05
export function consultarPainel(
  app: AppDaTurma,
  indiceAluno: number,
  bimestre: number,
): PainelAluno {
  return TODO<PainelAluno>("F08-A05");
}
