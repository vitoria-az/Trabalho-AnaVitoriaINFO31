# F07 — Object e Record

> Referência conceitual: slides 46–47. Tempo típico: 2–8 minutos por checkpoint.

## Objetivo

Descrever uma entidade com Object e um padrão de chaves/valores com Record.

## Arquivo de trabalho

`src/fases/f07-object-record.ts`

## Desafios

### F07-A01 — Construir aluno (25 XP)

Faça `criarAluno` devolver um objeto com nome, idade e entregouAtividade.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F07-A02 — Consultar propriedade (25 XP)

Faça `nomeDoAluno` devolver a propriedade `nome` da entidade recebida.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F07-A03 — Criar Record (25 XP)

Crie um Record associando os dois nomes recebidos às respectivas notas.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F07-A04 — Consultar Record (25 XP)

Faça `consultarRegistro` devolver o valor da chave recebida.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

## Ciclo de trabalho

Depois de cada TODO, salve e execute:

```bash
npm run check
```

Se precisar, peça somente o nível de dica necessário:

```bash
npm run dica -- F07-A01
```
