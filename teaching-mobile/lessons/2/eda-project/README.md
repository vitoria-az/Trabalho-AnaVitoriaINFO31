# EDA Project — Painel de Permanência Estudantil

Miniprojeto didático em **React Native + Expo + TypeScript** para praticar tipos, interfaces, funções tipadas, componentes, `props`, estado e manipulação de coleções.

O projeto apresenta um painel com indicadores **fictícios e agregados** de permanência estudantil. A atividade foi preparada para ser concluída diretamente em `app/index.tsx`, a partir dos comentários `TODO 1` a `TODO 5`.

> **Importante:** os dados usados neste projeto são exclusivamente didáticos. Eles não representam estudantes, turmas ou informações institucionais reais.

## Objetivos de aprendizagem

Ao concluir a atividade, você deverá ser capaz de:

- restringir valores possíveis com união de literais em `type`;
- modelar objetos com `interface`;
- declarar parâmetros e retornos de funções com tipos explícitos;
- criar componentes reutilizáveis que recebem dados por `props`;
- controlar a interface com `useState`;
- filtrar coleções com `.filter()`;
- renderizar coleções com `.map()` e `key`;
- relacionar tipos TypeScript com componentes React Native.

## Tecnologias do projeto

- Expo `~57.0.14`
- React `19.2.3`
- React Native `0.86.2`
- React Native Web `^0.21.2`
- TypeScript `~6.0.3`

O TypeScript está configurado com `strict: true`.

## Estrutura principal

```text
eda-project/
├── app/
│   └── index.tsx       # atividade principal
├── assets/             # ícones e recursos visuais
├── App.tsx             # encaminha para app/index.tsx
├── index.ts            # ponto de entrada do Expo
├── app.json            # configuração do Expo
├── package.json        # dependências e scripts
├── package-lock.json   # versões travadas das dependências
└── tsconfig.json       # configuração do TypeScript
```

## Como executar

Na raiz do projeto, instale exatamente as dependências registradas no `package-lock.json`:

```bash
npm ci
```

Antes de iniciar a aplicação, valide o ambiente e a compatibilidade das dependências com o Expo:

```bash
npx expo-doctor
```

Se a verificação não apontar problemas que impeçam a execução, inicie o Expo:

```bash
npx expo start
```

Você também pode usar os scripts disponíveis:

```bash
npm run web
npm run android
npm run ios
```

No terminal do Expo, pressione `w` para abrir a versão Web. Para executar em um dispositivo compatível, utilize o Expo Go conforme o ambiente disponibilizado em aula.

## Missão

O painel contém três indicadores simulados e um botão que deverá permitir alternar entre:

1. **todos os indicadores**; e
2. **somente os indicadores que exigem atenção**.

O texto do botão e a quantidade de itens exibidos devem acompanhar o estado atual da interface.

## Atividade

Abra `app/index.tsx` e implemente os cinco pontos marcados com `TODO`.

### TODO 1 — Restringir as situações válidas

O tipo `SituacaoIndicador` não deve aceitar qualquer `string`. Restrinja-o para permitir apenas as duas situações utilizadas pelo painel:

```ts
"adequado" | "atencao"
```

### TODO 2 — Formatar os valores

A função `formatarValor` já possui parâmetros e retorno tipados.

Ajuste sua implementação para que:

- `%` e `p.p.` sejam exibidos junto ao número;
- `estudantes` seja exibido com um espaço após o número.

Exemplos esperados:

```text
88%
3p.p.
7 estudantes
```

### TODO 3 — Filtrar a coleção

A variável `indicadoresVisiveis` deve depender de `somenteAtencao`.

Quando o filtro estiver ativo, mantenha apenas os indicadores cuja situação seja `"atencao"`. Quando estiver desativado, utilize a coleção completa.

Use `.filter()` para realizar essa transformação.

### TODO 4 — Alternar o estado

A função `alternarFiltro` deve alternar o estado entre `true` e `false` a cada toque no botão.

Evite definir sempre o mesmo valor. Faça a atualização considerando o estado anterior.

### TODO 5 — Atualizar a contagem

A quantidade exibida ao lado do botão deve representar o número de cartões que estão realmente visíveis na tela.

Ela deve mudar automaticamente quando o filtro for ativado ou removido.

## Resultado esperado

Ao finalizar:

- a tela inicial exibirá três cartões;
- cada cartão será renderizado pelo componente `CartaoIndicador`;
- indicadores em atenção terão destaque visual;
- o botão **Somente atenção** ativará o filtro;
- o botão mudará para **Mostrar todos** enquanto o filtro estiver ativo;
- a quantidade exibida será atualizada de acordo com a coleção filtrada;
- um novo toque restaurará os três indicadores.

## Checklist de validação

Antes de entregar, verifique:

- [ ] `SituacaoIndicador` aceita somente `"adequado"` e `"atencao"`;
- [ ] os objetos de `INDICADORES` seguem a interface `IndicadorEDA`;
- [ ] `formatarValor` mantém parâmetros e retorno tipados;
- [ ] `CartaoIndicador` recebe um indicador por `props`;
- [ ] `useState<boolean>` controla o filtro;
- [ ] o botão alterna o estado nos dois sentidos;
- [ ] a coleção utiliza `.filter()` para selecionar os indicadores;
- [ ] a renderização utiliza `.map()`;
- [ ] cada cartão possui `key={indicador.id}`;
- [ ] a contagem acompanha os indicadores visíveis;
- [ ] `npx expo-doctor` não aponta problemas que impeçam a execução;
- [ ] a aplicação executa sem erro no ambiente utilizado em aula;
- [ ] você consegue identificar no código um exemplo de **tipo, interface, função tipada, prop, estado e coleção**.

## Entrega

Confira primeiro as alterações:

```bash
git status
git diff
```

Depois registre sua implementação:

```bash
git add app/index.tsx
git commit -m "feat(aula-04): implementar painel EDA tipado"
```

Entregue:

1. o identificador do commit;
2. uma captura com todos os indicadores;
3. uma captura com o filtro **Somente atenção** ativado.

## Desafio opcional

Adicione um quarto indicador fictício à coleção `INDICADORES`, respeitando integralmente a interface `IndicadorEDA` e os tipos já definidos.

O desafio deve reutilizar a estrutura existente. Não é necessário adicionar API, banco de dados, gráficos ou bibliotecas externas.
