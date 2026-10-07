// Baseline consolidada da Aula 4. Todos os registros são fictícios e agregados.
export type SituacaoIndicador = "adequado" | "atencao";
export type UnidadeIndicador = "%" | "p.p." | "estudantes";

export interface IndicadorEDA {
  id: number;
  titulo: string;
  valor: number;
  meta: number;
  unidade: UnidadeIndicador;
  situacao: SituacaoIndicador;
}

export const INDICADORES: IndicadorEDA[] = [
  { id: 1, titulo: "Frequência média", valor: 88, meta: 90, unidade: "%", situacao: "atencao" },
  { id: 2, titulo: "Atividades entregues", valor: 94, meta: 90, unidade: "%", situacao: "adequado" },
  { id: 3, titulo: "Estudantes em acompanhamento", valor: 7, meta: 5, unidade: "estudantes", situacao: "atencao" },
];

export function formatarValor(valor: number, unidade: UnidadeIndicador): string {
  return unidade === "estudantes" ? `${valor} ${unidade}` : `${valor}${unidade}`;
}
