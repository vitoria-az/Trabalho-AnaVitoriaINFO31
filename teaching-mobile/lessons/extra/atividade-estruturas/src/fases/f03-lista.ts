/**
 * F03 — Array, vetor e lista encadeada
 * A infraestrutura do nó já está pronta. Edite somente os TODOs.
 * Verificação: npm run check
 */
import { TODO } from "../lib/todo";

export type No = {
  valor: string;
  proximo: No | null;
};

export function criarNo(valor: string): No {
  return { valor, proximo: null };
}

export function avancar(inicio: No | null, passos: number): No | null {
  let atual = inicio;
  for (let passo = 0; passo < passos && atual !== null; passo += 1) {
    atual = atual.proximo;
  }
  return atual;
}

// TODO F03-A01
export function conectar(primeiro: No, segundo: No): No {
  return TODO<No>("F03-A01");
}

// TODO F03-A02
export function formarTrio(primeiro: No, segundo: No, terceiro: No): No {
  return TODO<No>("F03-A02");
}

// TODO F03-A03
export function inserirNoInicio(inicio: No | null, valor: string): No {
  return TODO<No>("F03-A03");
}

// TODO F03-A04
export function acessoDireto(valores: string[], indice: number): string {
  return TODO<string>("F03-A04");
}

// TODO F03-A05
export function quartoPorPercurso(inicio: No | null): string | undefined {
  return TODO<string | undefined>("F03-A05");
}
