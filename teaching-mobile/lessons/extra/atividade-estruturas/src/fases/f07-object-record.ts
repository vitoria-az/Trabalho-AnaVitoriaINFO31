/**
 * F07 — Object e Record
 * Edite somente os TODOs deste arquivo.
 * Verificação: npm run check
 */
import { TODO } from "../lib/todo";

export type Aluno = {
  nome: string;
  idade: number;
  entregouAtividade: boolean;
};

// TODO F07-A01
export function criarAluno(nome: string, idade: number, entregouAtividade: boolean): Aluno {
  return TODO<Aluno>("F07-A01");
}

// TODO F07-A02
export function nomeDoAluno(aluno: Aluno): string {
  return TODO<string>("F07-A02");
}

// TODO F07-A03
export function criarRegistroNotas(
  nome1: string,
  nota1: number,
  nome2: string,
  nota2: number,
): Record<string, number> {
  return TODO<Record<string, number>>("F07-A03");
}

// TODO F07-A04
export function consultarRegistro(
  registro: Record<string, number>,
  nome: string,
): number | undefined {
  return TODO<number | undefined>("F07-A04");
}
