# Trilha B — EDA / Permanência — Aula 5

## Operação Interface Resgatada

Na Aula 4 você fez a lógica funcionar. **Nesta aula você NÃO vai recriar tipos, props, estado, filtro ou seleção.** O ponto de partida já contém a solução lógica consolidada e um componente tipado separado.

A missão é transformar uma interface que funciona em uma interface **mais clara, tocável e compreensível**.

Abra primeiro `MISSOES.html` e mantenha este README como guia técnico.

## Definição de pronto

- lógica da Aula 4 preservada;
- pelo menos 3 barreiras observadas e registradas antes da edição;
- layout melhorado com `View`, `Image`, `StyleSheet` e Flexbox;
- controle acionável com feedback `pressed`;
- alvo de toque adequado no controle acionável;
- papel/nome acessível onde houver ação;
- estado importante também comunicado em texto;
- teste por outra dupla sem explicação;
- uma barreira corrigida após o teste;
- evidência antes/depois, commit e ticket individual.

## Missões — 100 XP formativos

| Missão | Tempo | XP | Você aprende a... |
|---|---:|---:|---|
| M1 Scanner de Barreiras | 8 min | 15 | diagnosticar antes de editar |
| M2 Laboratório de Layout | 18 min | 30 | usar Image + Flexbox com propósito |
| M3 Toque que Responde | 21 min | 35 | feedback, alvo de toque e semântica |
| Boss Fight — Teste Cego | 12 min | 20 | validar com outra pessoa e corrigir |

> XP não é nota. Dicas não reduzem XP.

## Antes de começar

```powershell
node -v
npm -v
```

Para uma pasta homologada com `package-lock.json`:

```powershell
npm ci
npm run doctor
npm run web
```

Se o professor forneceu a pasta sem lockfile, execute `npm run preparar` uma única vez para gerar a instalação e o lockfile.

## Side Quest S0 — somente para quem continua no próprio código da Aula 4

O starter fornecido para esta aula **já começa com o cartão em `components/`** para evitar repetir a atividade anterior. Se você estiver usando a sua própria branch da Aula 4 e o cartão ainda estiver dentro de `app/index.tsx`, mova-o para `components/CartaoIndicador.tsx` antes da M1. **Sem XP: é só alinhamento da baseline.**

## M1 — primeiro observar, depois editar

Abra `docs/AUDITORIA_INTERFACE.md`. Não altere o código nos primeiros 60 segundos. Sua equipe deve registrar evidências, não opiniões genéricas.

## M2 — layout como resposta a um problema

Use o asset local `assets/images/painel-didatico.png`. Ele é **fictício/decorativo**. Não busque imagem de comunidade, turma ou estudante real.

Perguntas úteis:
- qual View é o container?
- quais são os filhos?
- o grupo precisa de `row` ou `column`?
- qual filho deve receber `flex: 1`?
- o `gap` separa elementos do mesmo grupo ou grupos diferentes?

## M3 — toque e semântica

A regra é: **só elementos acionáveis recebem semântica de ação**. Em EDA, por exemplo, o filtro é acionável; o cartão de indicador continua informativo.

Use a referência Android de 48 × 48 dp para o controle acionável. `hitSlop` pode ajudar, mas não substitui uma interface visualmente clara e a área de toque não ultrapassa os limites da View pai.

## Boss Fight — teste cego

Abra `docs/TESTE_CRUZADO.md`. O visitante usa a interface sem orientação por 60 segundos. Registre uma barreira e corrija uma delas imediatamente.

## Fechamento

```powershell
npm run conferir
npm run contraste
npm test
```

Commit sugerido:

```powershell
git add .
git commit -m "feat(aula-05): corrigir barreiras de interface e acessibilidade"
```

Preencha `docs/TICKET_INDIVIDUAL.md`.
