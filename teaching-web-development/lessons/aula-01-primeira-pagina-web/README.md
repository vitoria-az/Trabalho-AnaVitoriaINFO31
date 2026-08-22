# Aula 1 — Fundamentos Web e primeira página

Este repositório acompanha a primeira aula de **Desenvolvimento de Sistemas Web**. Ele mostra um fluxo Web mínimo e completo:

1. o navegador solicita os arquivos ao servidor;
2. o HTML organiza o conteúdo;
3. o CSS apresenta a página;
4. o JavaScript reage ao clique;
5. o DOM é atualizado em memória;
6. o Git registra o incremento do projeto.

## Leia antes de acompanhar os slides

Os slides apresentam alguns nomes e comandos como **exemplos didáticos**. Neste repositório, use as correspondências abaixo:

| Nos slides | Neste projeto | Como interpretar |
|---|---|---|
| `#btn` | `#acao` | é o botão da página |
| `.status` | `.status` no CSS e `#status` no JavaScript | a classe cuida do estilo; o identificador permite alterar o texto |
| `.botao` | seletor `button` | ambos servem para estilizar o botão |
| `http://localhost:3000` | URL mostrada no terminal | com Python, normalmente será `http://localhost:8000` |
| histórias mostradas no slide | `docs/backlog.md` | adapte as três histórias existentes no arquivo |

O código já está montado para evitar problemas de digitação e configuração. Durante a prática, a dupla deve **localizar, explicar, modificar e testar** cada parte indicada nos slides. Apenas executar a página sem realizar as adaptações não conclui a atividade.

Para a entrega, o comando de commit, a definição de pronto e o ticket de saída válidos são os apresentados em [`ATIVIDADE.md`](./ATIVIDADE.md).

## Resultado esperado

Ao abrir o projeto por um servidor HTTP local, a página deve apresentar:

- o título `Projeto Integrador Web`;
- o estado inicial `Ideia em validação.`;
- o botão `Marcar interesse`;
- a mensagem `Interesse registrado.` após o clique.

## Estrutura

```text
aula-01-primeira-pagina-web/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── docs/
│   ├── backlog.md
│   └── mapa-pre-requisitos.md
├── ATIVIDADE.md
└── README.md
```

## Pré-requisitos

- Git;
- editor de código;
- navegador com DevTools;
- **uma** das opções de servidor local:
  - Node.js com npm/npx; ou
  - Python 3.

Confira o que está disponível no computador:

```powershell
node -v
npm -v
npx -v
py --version
python --version
git --version
```

Não há problema se os comandos de uma das rotas não forem reconhecidos. Escolha somente a rota que funcionar.

## Executar o projeto

No terminal, entre na pasta do projeto e escolha **uma** opção.

### Opção A — npm/npx

```powershell
npx serve .
```

Na primeira execução, o `npx` pode solicitar a instalação temporária do pacote `serve`. Confirme somente se o professor orientar.

### Opção B — Python 3

No Windows, tente primeiro:

```powershell
py -m http.server 8000
```

Se o comando `py` não for reconhecido, tente:

```powershell
python -m http.server 8000
```

Abra **a URL exibida no terminal**. Na rota Python, normalmente será `http://localhost:8000`. Mantenha o terminal em execução e use `Ctrl + C` para encerrar.

As duas opções servem os mesmos arquivos por HTTP e permitem realizar toda a atividade da Aula 1.

> Não abra apenas o arquivo `index.html` com duplo clique. Nesta aula queremos observar a comunicação por HTTP.

## O que observar no DevTools

1. Em **Network**, recarregue a página e localize as requisições de `index.html`, `style.css` e `app.js`.
2. Confira o método `GET`, o status da resposta e o `Content-Type`.
3. Em **Elements**, localize os elementos com os identificadores `status` e `acao`.
4. Clique em `Marcar interesse` e observe a alteração do DOM.
5. Em **Console**, confirme que não há erros.

## Registrar o trabalho com Git

Se a pasta ainda não for um repositório:

```powershell
git init
```

Depois da atividade:

```powershell
git status
git add .
git commit -m "feat: cria primeira pagina web interativa"
git log -1 --oneline
```

Não é necessário publicar ou fazer `push` nesta aula.

## Materiais da atividade

- [ATIVIDADE.md](./ATIVIDADE.md): roteiro prático e definição de pronto;
- [docs/mapa-pre-requisitos.md](./docs/mapa-pre-requisitos.md): diagnóstico individual;
- [docs/backlog.md](./docs/backlog.md): backlog inicial que a equipe deve adaptar.
