# Boss Fight — Teste Cego por Pares

## Regra dos 60 segundos

A dupla visitante usa a interface **sem receber explicação**. A dupla autora não pode apontar onde tocar.

### Visitante

- O que parece acionável?
- O toque produz resposta perceptível?
- Algum estado depende apenas de cor?
- O texto e a hierarquia estão claros?
- Há algo apertado, ambíguo ou difícil de tocar?

**Uma barreira observada:**

> Na versão inicial, o filtro parecia acionável, mas não apresentava feedback visual durante o toque. Além disso, não informava explicitamente seu papel e estado para tecnologias assistivas.

### Autores

**Correção escolhida:**

> Tornar o filtro mais perceptível e compreensível: adicionar estilo de pressionamento, alvo visual mínimo de 48 dp, rótulo acessível, papel de botão, estado selecionado e texto informando o filtro ativo.

**Arquivo/trecho alterado:**

> `app/index.tsx`, no `Pressable` do filtro e no cabeçalho da tela. A regra de filtragem foi preservada.

### Confirmação do visitante

Depois da correção, a tarefa ficou mais clara? `sim / parcialmente / não`

Comentário curto:

> Pendente de confirmação em uma sessão presencial de 60 segundos com uma dupla visitante. A validação automatizada confirmou os requisitos técnicos, mas não substitui o teste cego por pares.
