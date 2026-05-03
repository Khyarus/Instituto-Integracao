#!/bin/bash

# [ignoring loop detection]
# Script: criar_backend.sh
# Objetivo: Automatizar a criação do backend Java Spring Boot do TaskHub e configurar versionamento Git.

# Configurações de cores para saída
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Iniciando a configuração do backend TaskHub...${NC}"

# 1. Garantir que estamos em um repositório Git
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "chore: inicializa repositório com frontend e documentação base"
fi

# Garantir que a branch principal é 'main'
git branch -M main

# 2. Criar a estrutura inicial do backend na branch develop-backend
git checkout -b develop-backend

mkdir -p backend/src/main/java/com/taskhub
mkdir -p backend/src/main/resources
mkdir -p backend/src/test/java/com/taskhub

cat <<EOF > backend/pom.xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.4.0</version>
		<relativePath/>
	</parent>
	<groupId>com.taskhub</groupId>
	<artifactId>backend</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>TaskHub Backend</name>
	<description>Sistema profissional de gerenciamento de tarefas</description>
	<properties>
		<java.version>21</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
EOF

git add backend/pom.xml
git commit -m "chore: inicializa esqueleto do projeto Maven backend"

# 3. Feature: Entidade Task
git checkout -b feature/entidade-task
mkdir -p backend/src/main/java/com/taskhub/model

cat <<EOF > backend/src/main/java/com/taskhub/model/Task.java
package com.taskhub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String status;

    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        if (status == null) status = "PENDENTE";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getDataCriacao() { return dataCriacao; }
}
EOF

git add .
git commit -m "feat: cria entidade Task com anotações JPA"
git checkout develop-backend
git merge feature/entidade-task

# 4. Feature: Repositório Task
git checkout -b feature/repositorio-task
mkdir -p backend/src/main/java/com/taskhub/repository

cat <<EOF > backend/src/main/java/com/taskhub/repository/TaskRepository.java
package com.taskhub.repository;

import com.taskhub.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
EOF

git add .
git commit -m "feat: adiciona repositório JPA para Task"
git checkout develop-backend
git merge feature/repositorio-task

# 5. Feature: Controller e Service Task
git checkout -b feature/controller-task
mkdir -p backend/src/main/java/com/taskhub/service
mkdir -p backend/src/main/java/com/taskhub/controller

cat <<EOF > backend/src/main/java/com/taskhub/service/TaskService.java
package com.taskhub.service;

import com.taskhub.model.Task;
import com.taskhub.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<Task> findAll() { return repository.findAll(); }
    public Optional<Task> findById(Long id) { return repository.findById(id); }
    public Task save(Task task) { return repository.save(task); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
EOF

cat <<EOF > backend/src/main/java/com/taskhub/controller/TaskController.java
package com.taskhub.controller;

import com.taskhub.model.Task;
import com.taskhub.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public List<Task> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task taskDetails) {
        return service.findById(id).map(task -> {
            task.setTitulo(taskDetails.getTitulo());
            task.setDescricao(taskDetails.getDescricao());
            task.setStatus(taskDetails.getStatus());
            return ResponseEntity.ok(service.save(task));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
EOF

git add .
git commit -m "feat: implementa TaskController e TaskService com endpoints CRUD"
git checkout develop-backend
git merge feature/controller-task

# 6. Feature: Configuração de Banco e App Principal
git checkout -b feature/configuracao-banco

cat <<EOF > backend/src/main/java/com/taskhub/TaskhubApplication.java
package com.taskhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskhubApplication {
	public static void main(String[] args) {
		SpringApplication.run(TaskhubApplication.class, args);
	}
}
EOF

cat <<EOF > backend/src/main/resources/application.properties
# PERFIL DE DESENVOLVIMENTO (H2)
spring.application.name=taskhub
spring.datasource.url=jdbc:h2:mem:taskdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update

# CONFIGURAÇÕES PARA PRODUÇÃO (PostgreSQL - Descomentar em prod)
# spring.datasource.url=jdbc:postgresql://localhost:5432/taskhub
# spring.datasource.username=postgres
# spring.datasource.password=sua_senha
# spring.jpa.hibernate.ddl-auto=none
EOF

git add .
git commit -m "feat: configura banco de dados H2 e perfil de produção"
git checkout develop-backend
git merge feature/configuracao-banco

# 7. Finalizando o Git: Merge na Main e Logs
git checkout main
git merge develop-backend

mkdir -p docs/evidences/version-control
git log --all --oneline --graph > docs/evidences/version-control/evidencia_backend.log

# 8. Criação/Atualização da Documentação Completa
mkdir -p docs/workflow

cat <<EOF > docs/workflow/development-vs-production.md
# Estratégia de Ambiente: Desenvolvimento vs Produção

## Fluxo de Branches
- **main**: Código estável e pronto para produção.
- **develop-backend**: Integração das novas funcionalidades do backend.
- **feature/**: Desenvolvimento isolado de cada módulo.

## Diferenças de Configuração
- **Dev**: Banco H2 em memória, console habilitado, ddl-auto=update.
- **Prod**: Banco PostgreSQL persistente, segurança reforçada, logs monitorados.
EOF

cat <<EOF > docs/planejamento.md
# Planejamento do Projeto TaskHub

## Backlog do Produto
| ID | Épico | História de Usuário | Prioridade | Status |
|----|-------|---------------------|------------|--------|
| 01 | API | Criar estrutura da entidade Task | Alta | Concluído |
| 02 | API | Implementar persistência com JPA | Alta | Concluído |
| 03 | API | Desenvolver endpoints REST CRUD | Alta | Concluído |
| 04 | Infra | Configurar banco de dados H2/Postgres | Média | Concluído |

## Roadmap Bimestral
- **Mês 1**: Setup backend, CRUD básico, integração frontend-backend.
- **Mês 2**: Autenticação JWT, Deploy em nuvem, Testes de Integração.
EOF

cat <<EOF > docs/workflow/kanban.md
# Quadro Kanban - Backend

## A Fazer (To Do)
- [ ] Autenticação de Usuários
- [ ] Validação de Campos

## Em Execução (Doing)
- [ ] Documentação Swagger

## Concluído (Done)
- [x] Entidade Task
- [x] Repositório JPA
- [x] Controller CRUD
- [x] Configuração H2
EOF

cat <<EOF > docs/workflow/gantt.md
# Cronograma Gantt (Resumo)

- Semana 1: Estruturação do Banco e Modelos (Features 1 e 2)
- Semana 2: Desenvolvimento de Controllers e Serviços (Feature 3)
- Semana 3: Configuração de Ambientes e Deploy Inicial (Feature 4)
EOF

cat <<EOF > docs/workflow/team-organization.md
# Organização da Equipe

- **Frontend**: Focado na interface React/Vite e consumo da API.
- **Backend**: Focado na lógica de negócio Java/Spring e persistência.
- **DevOps**: Automação de CI/CD e gerenciamento de banco de dados.
EOF

cat <<EOF > LEIAME_FISICO.txt
ATENÇÃO: Este repositório contém o backlog e planejamento digital.
As evidências físicas (Fotos do Kanban no quadro e Cronograma Gantt em papel) 
devem ser anexadas manualmente à pasta 'docs/fisico' antes do envio final.
EOF

# 9. README.md Principal
cat <<EOF > README.md
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
| POST | /api/tasks | Cria nova tarefa | \`{"titulo": "Estudar", "descricao": "Java 21"}\` |
| PUT | /api/tasks/{id} | Atualiza uma tarefa | \`{"titulo": "Estudar Spring"}\` |
| DELETE | /api/tasks/{id} | Remove uma tarefa | N/A |

## Como Rodar
1. **Pré-requisitos**: JDK 21 e Maven instalados.
2. Clone o repositório.
3. Entre na pasta \`backend/\`.
4. Execute: \`mvn spring-boot:run\`.
5. Acesse o console H2 em: \`http://localhost:8080/h2-console\`.

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
EOF

# 10. Finalização e Empacotamento
git add .
git commit -m "docs: atualiza documentação completa e README final"

echo -e "${GREEN}Processo concluído com sucesso! Gerando arquivo TaskHub.zip...${NC}"

# Comando para zipar (garantindo que o .git seja incluído)
zip -r TaskHub.zip . -x "node_modules/*" "*.zip" "criar_backend.sh"

echo -e "${BLUE}==================================================================${NC}"
echo -e "${GREEN}ARQUIVO TaskHub.zip GERADO!${NC}"
echo -e "${BLUE}IMPORTANTE: Não esqueça de adicionar as fotos dos artefatos físicos${NC}"
echo -e "${BLUE}(Kanban/Gantt) manualmente antes de realizar a entrega final.${NC}"
echo -e "${BLUE}==================================================================${NC}"
