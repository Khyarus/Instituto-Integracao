# TaskHub - Gerenciamento de Tarefas Profissional

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-brightgreen)
![Java](https://img.shields.io/badge/Java-21-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## Descrição
O TaskHub é uma solução robusta para organização de produtividade, unindo um backend potente em Spring Boot com uma arquitetura escalável e documentação completa.

## Tecnologias
- **Backend**: Java 21, Spring Boot 3.4.0, JPA/Hibernate.
- **Banco de Dados**: H2 (Dev), PostgreSQL (Prod).
- **Documentação**: Markdown, Git Flow.

## Arquitetura
O sistema segue o padrão **MVC (Model-View-Controller)** simplificado com uma camada de **Service** para desacoplamento da lógica de negócio e **Repository** para abstração de dados.

## Endpoints da API
| Método | Rota | Descrição | Exemplo de Corpo |
|--------|------|-----------|------------------|
| GET | /api/tasks | Lista todas as tarefas | N/A |
| GET | /api/tasks/{id} | Busca tarefa por ID | N/A |
| POST | /api/tasks | Cria nova tarefa | `{"titulo": "Estudar", "descricao": "Java 21"}` |
| PUT | /api/tasks/{id} | Atualiza uma tarefa | `{"titulo": "Estudar Spring"}` |
| DELETE | /api/tasks/{id} | Remove uma tarefa | N/A |

## Como Rodar
1. **Pré-requisitos**: JDK 21 e Maven instalados.
2. Clone o repositório.
3. Entre na pasta `backend/`.
4. Execute: `mvn spring-boot:run`.
5. Acesse o console H2 em: `http://localhost:8080/h2-console`.

## Frontend
O frontend do projeto está implementado em `src/` e usa:
- **React 19** com **TypeScript**.
- **Vite** como bundler.
- **Tailwind CSS** para estilização e classes utilitárias.
- **@tanstack/react-router** para navegação entre páginas.
- **React Hook Form + Zod** para validação de formulários.
- **Axios** para chamadas HTTP.
- **Framer Motion** para animações e transições.

Principais páginas e áreas implementadas:
- Home, Sobre, Contato, Doações, Cadastro, Login, Recuperar Senha, Política de Privacidade e Termos de Uso.
- Painel administrativo com gerenciamento de Usuários, Mensagens, Famílias, Conteúdo e Configurações.

A estrutura do frontend inclui:
- `src/routes/` para páginas e rotas.
- `src/components/` para componentes reutilizáveis.
- `src/components/ui/` para componentes de interface baseados em Radix.
- `src/lib/axios.ts` para cliente HTTP.
- `src/schemas/` para validação de formulários.
- `src/stores/` para estado global.
- `src/utils/` para utilitários como reCAPTCHA, máscaras e sanitização.

Para rodar o frontend:
1. Execute `npm install` na raiz do projeto.
2. Execute `npm run dev`.

Para mais detalhes de frontend e documentação do projeto, consulte `docs/README.md`.

## Política de Branches
- **main**: Versão produtiva.
- **develop-backend**: Integração de desenvolvimento.
- **feature/***: Novas funcionalidades.

## Contribuir
1. Faça um fork.
2. Crie uma branch feature.
3. Envie um Pull Request.

---
**Licença**: MIT
**Contato**: dev@taskhub.com
