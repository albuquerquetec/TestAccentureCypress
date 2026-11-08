# Desafio QA Automation – Accenture

Automação do desafio técnico da Accenture em **Cypress** e **TypeScript**, com Custom Commands.

Autor: Anderson Albuquerque.

- **Parte 1 (API):** `cy.request`
- **Parte 2 (UI):** Cypress + Custom Commands
- Execução da suíte com `npm test`

## Pré-requisitos

- Node.js 22
- npm

## Como executar

Instalar dependências:

```bash
npm ci
```

Todos os testes (API + UI):

```bash
npm test
```

Somente API:

```bash
npm run test:api
```

Somente UI:

```bash
npm run test:ui
```

Abrir o Cypress na máquina:

```bash
npm run cy:open
```

A base é `https://demoqa.com`. Na esteira do GitHub Actions o Chrome sobe em modo headless. O workflow está em `.github/workflows/ci.yml` e roda a suíte em todo push na `main` e em pull request. Screenshots e vídeos da falha são publicados como artefato.

## Cobertura

### Parte 1 – Book Store API

Fluxo único e contínuo:

1. Criar usuário (`POST /Account/v1/User`)
2. Gerar token (`POST /Account/v1/GenerateToken`)
3. Confirmar autorização (`POST /Account/v1/Authorized`)
4. Listar livros (`GET /BookStore/v1/Books`)
5. Alugar dois livros (`POST /BookStore/v1/Books`)
6. Consultar detalhes do usuário com os livros (`GET /Account/v1/User/{userID}`)

### Parte 2 – Frontend

| Teste | Fluxo |
| --- | --- |
| 1 | Forms → Practice Form → preenchimento aleatório + upload `.txt` → submit → popup → fechar |
| 2 | Alerts, Frame & Windows → Browser Windows → New Window → validar mensagem → fechar |
| 3 | Elements → Web Tables → criar → editar → deletar |
| Bônus | Criar 12 registros dinamicamente e deletar todos |
| 4 | Widgets → Progress Bar → parar ≤ 25% → concluir 100% → reset |
| 5 | Interactions → Sortable → drag and drop em ordem crescente |

O arquivo de upload está versionado em `cypress/fixtures/upload/sample.txt`.

## Estrutura

```
cypress/e2e/api     cenário de API
cypress/e2e/ui      cenários de interface
cypress/support     Custom Commands, massa aleatória e apoio
cypress/fixtures    arquivo de upload
```
