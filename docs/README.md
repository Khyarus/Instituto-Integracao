# Documentação do Projeto

## Visão geral
Este documento complementa a documentação já existente em `docs/planejamento.md` e `docs/workflow/` com foco nas funcionalidades de frontend implementadas em `src`.

## Frontend implementado
O frontend está construído com:
- **React 19** e **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **@tanstack/react-router** para roteamento
- **React Hook Form + Zod** para validação de formulários
- **Axios** para chamadas HTTP
- **Framer Motion** para animações e transições
- **Radix UI** primitives via componentes personalizados em `src/components/ui`

## Páginas e rotas principais
O app contém as seguintes páginas no frontend:
- **Home** (`/`)
- **Sobre** (`/sobre`)
- **Contato** (`/contato`)
- **Doações** (`/doacoes`)
- **Cadastro** (`/cadastro`)
- **Login** (`/login`)
- **Recuperar senha** (`/recuperar-senha`)
- **Política de privacidade** (`/politica-de-privacidade`)
- **Termos de uso** (`/termos-de-uso`)

Também há um painel de administração com páginas para:
- **Administração principal** (`/admin`)
- **Usuários**
- **Mensagens**
- **Famílias**
- **Conteúdo**
- **Configurações**

## Estrutura do frontend em `src`
- `src/routes/` — rotas e páginas da aplicação
- `src/components/` — componentes reutilizáveis e layout global
- `src/components/ui/` — componentes de interface baseados em Radix
- `src/lib/axios.ts` — configuração de cliente HTTP
- `src/schemas/` — validações de formulário
- `src/stores/` — gerenciamento de estado com `zustand`
- `src/utils/` — utilitários de máscaras, reCAPTCHA, redirecionamentos, sanitização e validações

## Como executar o frontend
1. Instale as dependências na raiz do projeto:
   ```bash
   npm install
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra o endereço exibido pelo Vite.

## Observações
- Este README complementa a documentação criada por outros desenvolvedores sem alterar o conteúdo original.
- O frontend é responsivo e usa componentes reutilizáveis para manter consistência entre as páginas.
