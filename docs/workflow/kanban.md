# Quadro Kanban — Projeto TaskHub / Instituto-Integracao

> Quadro de acompanhamento atualizado com base nas evidências reais do repositório
> (PRs #1–#6 mergeados, histórico de commits e Network Graph do GitHub).
> Período coberto: **25/abr/2026 → 02/mai/2026**.

---

## A Fazer (To Do)

### Backend
- [ ] **Autenticação JWT** — endpoints de login/registro, geração e validação de token.
- [ ] **Validação de campos** com Bean Validation (`@NotNull`, `@Email`, `@Size`).
- [ ] **Tratamento global de exceções** (`@ControllerAdvice`).
- [ ] **Testes de integração** dos endpoints CRUD da entidade Task.
- [ ] **Migração H2 → PostgreSQL** no perfil de produção.

### Frontend
- [ ] **Integração das telas de Login/Cadastro com a API** (atualmente apenas com validação local via Zod).
- [ ] **Proteção de rotas administrativas** (`/admin/*`) com guard baseado em token.
- [ ] **Consumo real dos endpoints de Task** via Axios.
- [ ] **Feedback de erro/sucesso** com toasts nas requisições HTTP.

### Infra / DevOps
- [ ] **Pipeline CI/CD** (GitHub Actions) para build e testes a cada push em `develop`.
- [ ] **Deploy em nuvem** do backend (Render/Railway) e frontend (Vercel).
- [ ] **Variáveis de ambiente** segregadas por perfil (`application-dev.properties` / `application-prod.properties`).

---

## Em Execução (Doing)

- [ ] **Documentação Swagger/OpenAPI** dos endpoints REST — em andamento na branch `develop-backend`.
- [ ] **Refinamento do painel administrativo** (`/admin`, usuários, mensagens, famílias, conteúdo, configurações).
- [ ] **Merge da branch `develop` para `main`** com a consolidação das features de frontend (já realizado no PR #6, em validação).

---

## Concluído (Done)

### Backend — Sprint 1 (MateusMantovi)
- [x] **`chore: inicializa esqueleto do projeto Maven backend`** — commit `b9754f2`.
- [x] **`feat: cria entidade Task com anotações JPA`** — commit `ab0c630` (branch `feature/entidade-task`).
- [x] **`feat: adiciona repositório JPA para Task`** — commit `f753890` (branch `feature/repositorio-task`).
- [x] **`feat: implementa TaskController e TaskService com endpoints CRUD`** — commit `55f204f` (branch `feature/controller-task`).
- [x] **`feat: configura banco de dados H2 e perfil de produção`** — commit `f03a97a` (branch `feature/configuracao-banco`).

### Frontend — Sprint 1/2 (MateusMantovi + João Gabriel Cansi Silveira)
- [x] **PR #1 — `feat: config raiz do projeto front`** (commit `e8273b5`) — setup Vite + React 19 + TypeScript + Tailwind.
- [x] **PR #2 — `feat: add icons`** (commit `69a64c3`) — biblioteca de ícones integrada.
- [x] **PR #3 — `feat: criado paginas e tsx inicial`** (commit `f161972`) — páginas Home, Sobre, Contato, Doações, Cadastro, Login, Recuperar Senha, Política de Privacidade, Termos de Uso.
- [x] **PR #4 — `feat: rotdas do frontend`** (commit `d0de371`) — roteamento com `@tanstack/react-router`.
- [x] **PR #5 — `feat: arquvios logica ts`** (commit `447edb6`) — `src/lib/axios.ts`, `src/schemas/`, `src/stores/` (zustand), `src/utils/`.
- [x] **PR #6 — `Develop push to master`** (merge `develop` → `main`, commit `87de28e`) — consolidação final.

### Documentação — Sprint 2
- [x] **`docs: atualiza documentação completa e README final`** — commit `9ea648e`.
- [x] `docs/planejamento.md` — backlog e roadmap bimestral.
- [x] `docs/workflow/development-vs-production.md` — separação dev/prod.
- [x] `docs/workflow/team-organization.md` — divisão de papéis (Frontend / Backend / DevOps).
- [x] `docs/workflow/gantt.md` — cronograma resumido por semana.
- [x] `README.md` — visão geral do frontend.

---

## Métricas atuais (extraídas das evidências do GitHub)

| Métrica | Valor |
|---|---|
| Pull Requests mergeados | **6** (todos closed, 0 open) |
| Contribuidores | **2** (João Gabriel Cansi Silveira #1 com 11 commits / MateusMantovi #2 com 6 commits) |
| Linhas adicionadas | **39.440 ++** (João Gabriel Cansi Silveira 38.704 / Mantovi 736) |
| Linhas removidas | **2 --** |
| Branches ativas no Network Graph | 9 (`main`, `develop`, `develop-backend`, e 6 feature branches) |
| Período de atividade | 25/abr/2026 → 02/mai/2026 |

---

## Legenda do fluxo

```
feature/* ──► develop ──► main
              (PRs)      (release)
```

Cada item da coluna **Done** está vinculado a pelo menos um commit/PR rastreável no histórico,
em conformidade com a estratégia de branches descrita em `docs/workflow/development-vs-production.md`.
