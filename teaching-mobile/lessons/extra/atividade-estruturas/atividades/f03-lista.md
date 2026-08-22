# F03 — Array, vetor e lista encadeada

> Referência conceitual: slides 21–33. Tempo típico: 2–8 minutos por checkpoint.

## Objetivo

Distinguir acesso por posição de percurso por referências, sem construir uma biblioteca de listas.

## Arquivo de trabalho

`src/fases/f03-lista.ts`

## Desafios

### F03-A01 — Conectar dois nós (25 XP)

Em `conectar`, ligue o primeiro nó ao segundo e devolva o primeiro.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F03-A02 — Formar uma cadeia (25 XP)

Em `formarTrio`, conecte primeiro → segundo → terceiro e devolva o primeiro.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F03-A03 — Inserir no início (25 XP)

Crie um novo nó com o nome recebido, aponte-o para o início atual e devolva o novo início.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F03-A04 — Acesso direto (25 XP)

Faça `acessoDireto` devolver o item do Array no índice recebido.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F03-A05 — Percorrer até o quarto (25 XP)

Use o helper pronto `avancar` para chegar ao quarto nó e devolver seu valor, quando existir.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

## Ciclo de trabalho

Depois de cada TODO, salve e execute:

```bash
npm run check
```

Se precisar, peça somente o nível de dica necessário:

```bash
npm run dica -- F03-A01
```
