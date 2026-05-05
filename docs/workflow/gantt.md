# Cronograma — Diagrama de Gantt

> Cronograma do projeto **TaskHub / Instituto-Integracao** ajustado às datas reais
> dos commits e Pull Requests evidenciados no repositório.
> Período de execução verificado: **25/abr/2026 → 02/mai/2026** (Sprint 1 — 1º bimestre).
> Período planejado: **25/abr/2026 → 31/mai/2026** (Sprints 1 e 2).

---

## Visão geral em formato Mermaid

```mermaid
gantt
    title TaskHub — Cronograma do 1º Bimestre
    dateFormat  YYYY-MM-DD
    axisFormat  %d/%m

    section Setup do Projeto
    Inicialização do Maven backend            :done,    s1, 2026-04-25, 1d
    Setup raiz frontend (Vite + React + TS)   :done,    s2, 2026-04-25, 1d

    section Backend (MateusMantovi)
    Entidade Task com JPA                     :done,    b1, 2026-04-26, 1d
    Repositório JPA                           :done,    b2, 2026-04-26, 1d
    TaskController e TaskService (CRUD)       :done,    b3, 2026-04-27, 1d
    Configuração H2 + perfil de produção      :done,    b4, 2026-04-28, 1d

    section Frontend (JoãO Gabriel Cansi Silveira)
    PR #1 - Config raiz do projeto            :done,    f1, 2026-04-25, 1d
    PR #2 - Biblioteca de ícones              :done,    f2, 2026-04-25, 1d
    PR #3 - Páginas e TSX inicial             :done,    f3, 2026-05-02, 1d
    PR #4 - Roteamento (tanstack/router)      :done,    f4, 2026-05-02, 1d
    PR #5 - Lógica TS (axios, schemas, store) :done,    f5, 2026-05-02, 1d

    section Integração
    Merge develop -> main (PR #6)             :done,    i1, 2026-05-02, 1d
    Documentação completa + README            :done,    i2, 2026-05-02, 1d

    section Sprint 2 - Planejado
    Autenticação JWT                          :active,  p1, 2026-05-05, 5d
    Validação de campos (Bean Validation)     :         p2, 2026-05-08, 3d
    Documentação Swagger                      :active,  p3, 2026-05-05, 4d
    Integração Front <-> API (Login/Cadastro) :         p4, 2026-05-10, 5d
    Migração H2 -> PostgreSQL                 :         p5, 2026-05-15, 3d
    Pipeline CI/CD (GitHub Actions)           :         p6, 2026-05-18, 4d
    Deploy em nuvem (back + front)            :         p7, 2026-05-22, 3d
    Testes de integração                      :         p8, 2026-05-25, 5d
```

---

## Cronograma textual por sprint

### Sprint 1 — Concluída (25/abr → 02/mai)

| Semana | Período | Atividade | Branch / PR | Status |
|--------|---------|-----------|-------------|--------|
| 1 | 25/abr | Inicialização do esqueleto Maven (backend) | `main` (`b9754f2`) | ✅ |
| 1 | 25/abr | Setup raiz do frontend (Vite/React/TS) | PR #1 | ✅ |
| 1 | 25/abr | Adição da biblioteca de ícones | PR #2 | ✅ |
| 1 | 26-28/abr | Entidade Task + Repositório JPA | `feature/entidade-task`, `feature/repositorio-task` | ✅ |
| 1 | 27-28/abr | TaskController + TaskService (CRUD REST) | `feature/controller-task` | ✅ |
| 1 | 28/abr | Configuração H2 e perfil de produção | `feature/configuracao-banco` | ✅ |
| 1 | 02/mai | Páginas e arquivos TSX iniciais | PR #3 | ✅ |
| 1 | 02/mai | Roteamento com `@tanstack/react-router` | PR #4 | ✅ |
| 1 | 02/mai | Lógica TS (Axios, schemas Zod, stores) | PR #5 | ✅ |
| 1 | 02/mai | Merge `develop` → `main` (release inicial) | PR #6 | ✅ |
| 1 | 02/mai | Documentação completa + README | `9ea648e` | ✅ |

### Sprint 2 — Planejada (05/mai → 31/mai)

| Semana | Período | Atividade | Responsável | Status |
|--------|---------|-----------|-------------|--------|
| 2 | 05-09/mai | Autenticação JWT (login/registro/token) | Backend | 🟡 A iniciar |
| 2 | 05-08/mai | Documentação Swagger/OpenAPI | Backend | 🔵 Em execução |
| 2 | 08-10/mai | Validação com Bean Validation | Backend | ⚪ A fazer |
| 3 | 10-14/mai | Integração frontend ↔ API (Login/Cadastro) | Frontend | ⚪ A fazer |
| 3 | 15-17/mai | Migração H2 → PostgreSQL | Backend | ⚪ A fazer |
| 4 | 18-21/mai | Pipeline CI/CD (GitHub Actions) | DevOps | ⚪ A fazer |
| 4 | 22-24/mai | Deploy em nuvem (Render/Vercel) | DevOps | ⚪ A fazer |
| 4 | 25-29/mai | Testes de integração + ajustes finais | Toda a equipe | ⚪ A fazer |

---

## Marcos (Milestones)

- 🏁 **M1 — 28/abr/2026** — Backend CRUD funcional com H2. ✅
- 🏁 **M2 — 02/mai/2026** — Frontend navegável com todas as páginas + merge `develop` → `main`. ✅
- 🏁 **M3 — 09/mai/2026** — Autenticação JWT integrada e Swagger publicado. 🟡
- 🏁 **M4 — 17/mai/2026** — Migração para PostgreSQL e ambiente de produção configurado. ⚪
- 🏁 **M5 — 31/mai/2026** — Deploy em nuvem com CI/CD ativo. ⚪

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Concluído (com evidência no Git) |
| 🔵 | Em execução |
| 🟡 | Próximo a iniciar |
| ⚪ | Planejado |
