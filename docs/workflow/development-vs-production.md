# Estratégia de Ambiente: Desenvolvimento vs Produção

## Fluxo de Branches
- **main**: Código estável e pronto para produção.
- **develop-backend**: Integração das novas funcionalidades do backend.
- **feature/**: Desenvolvimento isolado de cada módulo.

## Diferenças de Configuração
- **Dev**: Banco H2 em memória, console habilitado, ddl-auto=update.
- **Prod**: Banco PostgreSQL persistente, segurança reforçada, logs monitorados.
