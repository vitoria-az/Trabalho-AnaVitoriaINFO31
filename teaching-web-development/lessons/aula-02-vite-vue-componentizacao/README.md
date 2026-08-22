# Aula 2 — Vite, Vue 3 e componentização

Este repositório contém a versão de referência do laboratório da segunda aula de **Desenvolvimento de Sistemas Web**. O protótipo da Aula 1 foi organizado como uma aplicação Vue 3 executada com Vite.

Nesta aula, os componentes permanecem **estáticos**. Propriedades, eventos, estado e fluxo de dados serão estudados na Aula 3.

## Leia antes de acompanhar os slides

Os slides demonstram a criação de um projeto Vue desde o início. Para economizar tempo de instalação e garantir que todos partam da mesma base, este material já contém o projeto configurado e a versão final de referência.

| Nos slides | Neste material |
|---|---|
| `npm create vite@latest` | **não execute novamente**; use `npm ci` |
| requisitos mínimos do Node.js | o padrão da disciplina é Node.js `24.19.0` LTS |
| saída `VITE v5.4.0` | é ilustrativa; este projeto usa Vite `8.2.1` |
| criação de arquivos do zero | faça a reconstrução guiada descrita em `ATIVIDADE.md` |
| código resumido dos componentes | os arquivos do repositório são a referência executável |
| `localhost` exibido no slide | abra sempre a URL informada pelo terminal |

Em `App.vue`, os três componentes precisam estar importados, inclusive:

```javascript
import ProjectCard from './components/ProjectCard.vue'
```

As perguntas rápidas dos slides podem ser respondidas oralmente. Para a entrega, utilize a definição de pronto, o commit e o ticket de saída de [`ATIVIDADE.md`](./ATIVIDADE.md).

## Resultado esperado

O projeto deve executar no navegador e apresentar a seguinte árvore:

```text
App
├── AppHeader
├── ProjectCard
└── AppFooter
```

Cada componente possui uma responsabilidade:

- `AppHeader.vue`: identifica o projeto;
- `ProjectCard.vue`: apresenta o problema e a ação visual;
- `AppFooter.vue`: encerra a interface;
- `App.vue`: importa e compõe os três componentes.

## Duas formas de executar

Este ZIP permite duas rotas:

- **npm:** executa o ambiente de desenvolvimento completo, recompila os arquivos `.vue` e oferece HMR;
- **Python:** serve a cópia já compilada em `dist/`, permitindo abrir e analisar o protótipo sem npm.

### Opção A — desenvolvimento completo com npm

Pré-requisitos recomendados:

- Node.js `24.19.0` LTS com npm;
- Git;
- editor de código e navegador.

Confira o ambiente:

```powershell
node -v
npm -v
git --version
```

Na pasta do projeto, instale exatamente as dependências registradas e inicie o Vite:

```powershell
npm ci
npm run dev
```

Abra **a URL exibida no terminal** e mantenha o processo em execução. Para encerrar, use `Ctrl + C`.

### Opção B — visualização com Python 3

No Windows, tente primeiro:

```powershell
py -m http.server 8000 --directory dist
```

Se `py` não for reconhecido:

```powershell
python -m http.server 8000 --directory dist
```

Abra `http://localhost:8000` ou a URL indicada pelo terminal. Para encerrar, use `Ctrl + C`.

> A rota Python exibe o build pronto, mas não recompila `src/*.vue`. Alterar um componente somente aparecerá no navegador depois que uma máquina com npm executar `npm run build`. Se a dupla possuir apenas Python, ela deve analisar e editar o código-fonte e solicitar a validação do build no computador do professor ou de outra dupla.

Não execute o servidor Python na raiz sem `--directory dist`: o navegador não consegue interpretar diretamente os Single-File Components do Vue.

## Validar a compilação

```powershell
npm run build
```

O comando deve concluir sem erros e gerar a pasta `dist/`. A pasta normalmente não é versionada no projeto, mas uma cópia foi incluída neste material didático para a rota de contingência com Python.

## Estrutura relevante

```text
aula-02-vite-vue-componentizacao/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── ProjectCard.vue
│   │   └── AppFooter.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── docs/
│   └── App-monolitico.vue
├── dist/                    # versão compilada para a rota Python
├── ATIVIDADE.md
└── README.md
```

`node_modules/` contém as dependências instaladas. Não edite nem envie essa pasta ao Git.

## Fluxo de entrada da aplicação

1. `index.html` oferece o elemento `#app`;
2. `src/main.js` importa Vue, o CSS global e `App.vue`;
3. `createApp(App).mount('#app')` monta a aplicação;
4. `App.vue` compõe os três componentes filhos;
5. o Vite transforma os arquivos para o navegador durante o desenvolvimento.

## HMR: experimento rápido da rota npm

Com `npm run dev` ativo, altere um texto em `AppHeader.vue`, salve e observe a atualização no navegador. Em seguida, desfaça a mudança. Isso demonstra o ciclo de desenvolvimento sem exigir que o servidor seja reiniciado manualmente.

Na rota Python, compare a página compilada com os componentes em `src/`. Essa rota não possui HMR.

## Como será feita a componentização na prática

- **Com npm:** a dupla substituirá temporariamente `src/App.vue` pelo exemplo monolítico de `docs/App-monolitico.vue` e reconectará os três componentes, um de cada vez. Depois, personalizará pelo menos um conteúdo de cada componente e validará com HMR.
- **Com Python:** a dupla abrirá o build de referência, comparará o componente monolítico com a versão componentizada e fará as adaptações no código-fonte. A validação final será realizada pelo professor ou por uma dupla que tenha npm.

Os componentes prontos permanecem no pacote como apoio e referência. A dupla precisa conseguir explicar a responsabilidade, o import e a tag de cada componente; somente abrir o resultado pronto não conclui a atividade.

## Registrar o incremento

Se necessário, inicialize o repositório com `git init`. Depois:

```powershell
git status
git add .
git commit -m "feat: componentiza prototipo web com vue"
git log -1 --oneline
```

Não é necessário publicar ou fazer `push` nesta aula.

Consulte [ATIVIDADE.md](./ATIVIDADE.md) para o roteiro e a definição de pronto.
