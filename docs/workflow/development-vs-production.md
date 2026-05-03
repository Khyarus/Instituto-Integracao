# Estratégia de Ambiente: Desenvolvimento vs Produção

## Fluxo de Branches
- **main**: Código estável e pronto para produção.
- **develop-backend**: Integração das novas funcionalidades do backend.
- **feature/**: Desenvolvimento isolado de cada módulo.

## Diferenças de Configuração
- **Dev**: Banco H2 em memória, console habilitado, ddl-auto=update.
- **Prod**: Banco PostgreSQL persistente, segurança reforçada, logs monitorados.

## Frontend
- **Dev**: Vite Dev Server para desenvolvimento local do frontend, hot reload e sourcemaps.
- **Prod**: build otimizado do frontend com `npm run build`, geração de assets estáticos e entrega de arquivos prontos para deploy.
