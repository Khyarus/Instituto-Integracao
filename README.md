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
