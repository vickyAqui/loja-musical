# 🎵 Loja Musical

Projeto completo de uma loja de instrumentos musicais desenvolvido com React, Node.js, Express e MySQL.

## 📋 Funcionalidades Implementadas

### Sprint 1
- ✅ **S1-R3**: Catálogo Visual de Instrumentos com design moderno e responsivo
- ✅ **S1-R4**: Cadastro de Clientes com validação de dados
- ✅ **S1-R5**: Sistema de Login com autenticação JWT

### Sprint 2
- ✅ **S2-R1**: Área do Cliente (Meus Pedidos) com histórico completo
- ✅ **S2-R2**: Carrinho de Instrumentos Musicais funcional
- ✅ **S2-R3**: Finalização de Compra com confirmação
- ✅ **S2-R4**: Painel de Gestão de Pedidos (Admin)

## 🚀 Tecnologias Utilizadas

### Frontend
- React 19 com Hooks
- React Router DOM para navegação
- Axios para requisições HTTP
- CSS3 com design responsivo
- Context API para gerenciamento de estado

### Backend
- Node.js + Express
- MySQL para banco de dados
- JWT para autenticação
- Bcrypt para criptografia de senhas
- CORS habilitado

## 📦 Estrutura do Projeto

```
loja-musical/
├── backend/
│   ├── database/
│   │   └── schema.sql          # Script de criação do banco
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Configuração do MySQL
│   │   ├── routes/
│   │   │   ├── instrumentosRoutes.js
│   │   │   ├── clientesRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── carrinhoRoutes.js
│   │   │   └── pedidosRoutes.js
│   │   └── server.js           # Servidor principal
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CarrinhoContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Cadastro.jsx
    │   │   ├── InstrumentosPage.jsx
    │   │   ├── Carrinho.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── PedidoConfirmado.jsx
    │   │   ├── MeusPedidos.jsx
    │   │   ├── DetalhesPedido.jsx
    │   │   └── Admin.jsx
    │   ├── styles/
    │   │   └── [Arquivos CSS]
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- npm ou yarn

### 1. Configurar o Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script SQL
source backend/database/schema.sql

# Ou copie e cole o conteúdo do arquivo schema.sql no MySQL
```

### 2. Configurar o Backend

```bash
# Entre na pasta backend
cd backend

# Instale as dependências
npm install

# Copie o arquivo .env.example para .env
cp .env.example .env

# Edite o arquivo .env com suas credenciais do MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=sua_senha
# DB_NAME=loja_musical
# PORT=3001
# JWT_SECRET=seu_segredo_jwt

# Inicie o servidor
npm start

# Ou use o modo desenvolvimento com nodemon
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### 3. Configurar o Frontend

```bash
# Entre na pasta frontend (em outro terminal)
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📡 API - Endpoints Disponíveis

### Instrumentos
- `GET /api/instrumentos` - Lista todos os instrumentos

### Clientes (S1-R4)
- `POST /api/clientes` - Cadastrar novo cliente
- `GET /api/clientes/:id` - Buscar cliente por ID
- `PUT /api/clientes/:id` - Atualizar dados do cliente

### Autenticação (S1-R5)
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/verificar` - Verificar token (requer autenticação)

### Carrinho (S2-R2)
- `GET /api/carrinho` - Buscar carrinho do cliente (requer autenticação)
- `POST /api/carrinho` - Adicionar item ao carrinho (requer autenticação)
- `PUT /api/carrinho/:id` - Atualizar quantidade (requer autenticação)
- `DELETE /api/carrinho/:id` - Remover item (requer autenticação)
- `DELETE /api/carrinho` - Limpar carrinho (requer autenticação)

### Pedidos (S2-R1, S2-R3, S2-R4)
- `POST /api/pedidos` - Criar novo pedido (requer autenticação)
- `GET /api/pedidos/meus-pedidos` - Listar pedidos do cliente (requer autenticação)
- `GET /api/pedidos/:id` - Buscar detalhes do pedido (requer autenticação)
- `GET /api/pedidos/admin/todos` - Listar todos os pedidos - ADMIN (requer autenticação)
- `PUT /api/pedidos/admin/:id/status` - Atualizar status do pedido - ADMIN (requer autenticação)

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Após o login bem-sucedido:

1. O cliente recebe um token
2. O token é armazenado no `localStorage`
3. O token é enviado em todas as requisições que requerem autenticação no header:
   ```
   Authorization: Bearer seu_token_aqui
   ```

## 📱 Páginas do Sistema

### Públicas
- **Home** (`/`) - Página inicial com informações da loja
- **Login** (`/login`) - Página de login
- **Cadastro** (`/cadastro`) - Cadastro de novos clientes
- **Instrumentos** (`/instrumentos`) - Catálogo de instrumentos

### Protegidas (Requerem Login)
- **Carrinho** (`/carrinho`) - Carrinho de compras
- **Checkout** (`/checkout`) - Finalização da compra
- **Meus Pedidos** (`/meus-pedidos`) - Histórico de pedidos
- **Detalhes do Pedido** (`/pedido/:id`) - Detalhes de um pedido específico
- **Admin** (`/admin`) - Painel de gestão de pedidos

## 🎨 Design e UX

- Design moderno e responsivo
- Cards visuais para instrumentos
- Sistema de filtros por categoria
- Badges de status para pedidos
- Feedback visual para ações do usuário
- Layout adaptável para mobile, tablet e desktop

## 📊 Banco de Dados

### Tabelas Criadas

1. **instrumentos** - Produtos da loja
2. **clientes** - Usuários cadastrados
3. **pedidos** - Pedidos realizados
4. **itens_pedido** - Itens de cada pedido
5. **carrinho** - Carrinho de compras dos clientes

## 🧪 Testando a Aplicação

### Testar Cadastro e Login
1. Acesse `http://localhost:5173/cadastro`
2. Preencha o formulário de cadastro
3. Faça login em `http://localhost:5173/login`

### Testar Compra
1. Navegue até o catálogo
2. Adicione instrumentos ao carrinho
3. Acesse o carrinho e finalize a compra
4. Verifique o pedido em "Meus Pedidos"

### Testar Admin
1. Faça login como administrador
2. Acesse `/admin`
3. Gerencie os pedidos (altere status)

## 🔧 Dependências do Backend

```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mysql2": "^3.15.2"
}
```

## 🔧 Dependências do Frontend

```json
{
  "axios": "^1.12.2",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^6.22.0"
}
```

## 📝 Observações

- O projeto inclui dados de exemplo de instrumentos no script SQL
- O sistema de autenticação está simplificado para fins educacionais
- Em produção, adicione mais camadas de segurança
- Configure o JWT_SECRET com uma chave forte em produção
- Considere adicionar validações mais robustas

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como trabalho acadêmico para as Sprints 1, 2 e 3.

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.