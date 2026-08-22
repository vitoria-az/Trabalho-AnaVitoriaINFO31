# Miniprojeto A — Memórias Quilombolas

## Missão

Transformar uma tela inicial em uma pequena coleção tipada de memórias simuladas. Cada memória será exibida por um componente reutilizável. Ao tocar em um cartão, o aplicativo deverá destacar a escolha e apresentar seus detalhes.

> **Atenção:** todos os registros deste exercício são fictícios e foram criados apenas para aprendizagem. Eles não descrevem comunidades ou acontecimentos reais.

## O que você vai praticar

- união de literais com `type`;
- objeto tipado com `interface`;
- propriedade opcional;
- função com parâmetro e retorno tipados;
- componente reutilizável com `props`;
- estado com `useState`;
- eventos com `onPress`;
- coleção renderizada com `.map()`;
- identidade de itens com `key`;
- teste no navegador ou celular;
- validação do projeto com `expo-doctor`;
- registro da atividade com Git.

## Resultado esperado

A tela deve mostrar três cartões. Um toque/clique seleciona a memória; tocar novamente no mesmo cartão remove a seleção. Quando houver seleção, um painel deve exibir o resumo completo e, quando informado, o ano.

## Preparação no VS Code — 5 minutos

1. Abra o projeto-base usado na Aula 3.
2. Abra o terminal integrado do VS Code.
3. Confirme que está na pasta do projeto.
4. Se ainda não executou o projeto nesta máquina, instale as dependências:

```powershell
npm ci
```

5. Valide o ambiente e as dependências do Expo:

```powershell
npx expo-doctor
```

Se o comando indicar algum problema bloqueante, corrija-o antes de continuar.

6. Copie o arquivo `app/index.tsx` fornecido nesta atividade para a rota inicial do projeto-base.
7. Inicie o aplicativo:

```powershell
npx expo start
```

Abra no navegador com `w` ou leia o QR Code no Expo Go.

> Não instale bibliotecas adicionais e não recrie o projeto.

## Etapas da implementação — 35 minutos

Abra `app/index.tsx` e localize os comentários `TODO`.

### 1. Restrinja as categorias — 5 min

Troque o tipo amplo `string` por uma união que aceite somente:

```ts
"Relato" | "Lugar" | "Celebração"
```

Teste temporariamente uma categoria inválida e observe a indicação do editor. Depois, desfaça o erro.

### 2. Acrescente uma propriedade opcional — 7 min

Adicione:

```ts
ano?: number
```

à interface `Memoria`.

Inclua um ano em pelo menos dois registros. O terceiro pode permanecer sem ano.

### 3. Crie uma função tipada — 8 min

Crie a função:

```ts
function criarLegenda(memoria: Memoria): string
```

Ela deve retornar categoria, comunidade e, quando existir, o ano. Use a função dentro de `CartaoMemoria`.

### 4. Faça a seleção alternar — 8 min

A função `alternarSelecao` atualmente só seleciona. Altere-a para:

- remover a seleção quando o mesmo cartão for tocado novamente;
- selecionar o novo cartão quando o identificador for diferente.

Dica: o estado aceita:

```ts
number | null
```

### 5. Mostre o ano nos detalhes — 7 min

No painel de detalhes, mostre o ano apenas quando ele existir.

Não imprima `undefined` na tela.

## Fluxo da atividade

Resolva e teste um checkpoint antes de avançar para o próximo:

```text
Projeto abre
    ↓
Tipagem
    ↓
Função tipada
    ↓
Componente e props
    ↓
Coleção com map
    ↓
Estado e interação
    ↓
Teste
    ↓
Commit
```

## Teste e entrega — 15 minutos

Antes do commit, execute novamente:

```powershell
npx expo-doctor
```

Depois confirme o funcionamento do aplicativo:

```powershell
npx expo start
```

Verifique:

- [ ] `npx expo-doctor` não apresenta problema bloqueante;
- [ ] o projeto inicia normalmente;
- [ ] existem somente as três categorias permitidas;
- [ ] cada objeto segue a interface `Memoria`;
- [ ] `ano` é uma propriedade opcional do tipo `number`;
- [ ] `criarLegenda` possui parâmetro e retorno tipados;
- [ ] os cartões recebem dados por `props`;
- [ ] a coleção usa `.map()` e `key={memoria.id}`;
- [ ] o estado seleciona e remove a seleção;
- [ ] tocar em outro cartão altera a seleção;
- [ ] o ano aparece somente quando informado;
- [ ] o aplicativo abre sem tela vermelha no navegador ou celular;
- [ ] você consegue apontar no código um exemplo de tipo, prop, estado e coleção.

Faça o commit:

```powershell
git status
git add app/index.tsx
git commit -m "feat(aula-04): criar cartoes de memorias tipados"
```

Entregue:

- o identificador do commit;
- uma captura da tela com um cartão selecionado.

## Desafio opcional

Adicione uma quarta memória fictícia respeitando a interface.

A nova memória deve funcionar automaticamente com:

- a coleção;
- o `.map()`;
- o componente reutilizável;
- a seleção;
- o painel de detalhes.

Não adicione mapa, API, banco de dados nem biblioteca externa nesta aula.
