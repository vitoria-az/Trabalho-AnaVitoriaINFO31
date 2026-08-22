const MARCA_TODO = Symbol.for("ifma.estruturas.todo");

export type TodoPendente = {
  readonly __ifmaTodo: true;
  readonly id: string;
};

/**
 * Mantém o starter compilável sem fingir que a atividade foi concluída.
 * Substitua a chamada TODO somente no ponto indicado pelo exercício.
 */
export function TODO<T>(id: string): T {
  return Object.freeze({
    __ifmaTodo: true,
    id,
    [MARCA_TODO]: true,
  }) as T;
}
