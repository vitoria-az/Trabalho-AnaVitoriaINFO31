# F06 — Map: chave → valor

> Referência conceitual: slides 43–45 e 48. Tempo típico: 2–8 minutos por checkpoint.

## Objetivo

Associar cada estudante à sua nota e consultar pela chave.

## Arquivo de trabalho

`src/fases/f06-map.ts`

## Desafios

### F06-A01 — Criar Map (25 XP)

Crie um Map com Ana → 8.5, Bruno → 7 e Carla → 9.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F06-A02 — Registrar nota (25 XP)

Registre o par nome/nota no próprio Map e devolva esse Map.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F06-A03 — Consultar nota (25 XP)

Faça `consultarNota` devolver o valor associado ao nome recebido.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F06-A04 — Atualizar nota (25 XP)

Atualize a nota da chave recebida sem criar uma chave duplicada e devolva o Map.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

### F06-A05 — Mapear três notas (25 XP)

Crie e devolva um Map com os três pares recebidos pelos parâmetros.

**Comportamento esperado:** o verificador deve confirmar a operação para diferentes dados quando a tarefa recebe parâmetros.

## Ciclo de trabalho

Depois de cada TODO, salve e execute:

```bash
npm run check
```

Se precisar, peça somente o nível de dica necessário:

```bash
npm run dica -- F06-A01
```
