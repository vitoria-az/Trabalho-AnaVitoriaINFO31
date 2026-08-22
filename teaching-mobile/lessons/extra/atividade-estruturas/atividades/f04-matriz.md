# F04 — Matrizes

> Referência conceitual: slides 34–37. Tempo típico: 2–8 minutos por checkpoint.

## Objetivo

Representar notas por estudante e bimestre com linhas e colunas.

## Arquivo de trabalho

`src/fases/f04-matriz.ts`

## Desafios

### F04-A01 — Criar matriz (30 XP)

Crie a matriz da aula: Ana [8, 9], Bruno [7, 8], Carla [9, 10].

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F04-A02 — Acessar célula (30 XP)

Faça `obterNota` devolver a célula indicada por linha e coluna.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F04-A03 — Obter linha (30 XP)

Faça `obterLinha` devolver toda a linha indicada.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F04-A04 — Alterar célula (30 XP)

Altere a célula indicada no próprio objeto matriz e devolva a matriz.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F04-A05 — Ler dimensões (30 XP)

Faça `dimensoes` devolver `[quantidadeDeLinhas, quantidadeDeColunas]`.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

## Ciclo de trabalho

Depois de cada TODO, salve e execute:

```bash
npm run check
```

Se precisar, peça somente o nível de dica necessário:

```bash
npm run dica -- F04-A01
```
