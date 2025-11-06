# 🎵 Loja Musical - Ponte Sonora

Plataforma completa de e-commerce para venda de instrumentos musicais, discos de vinil, CDs e acessórios musicais, desenvolvida com arquitetura moderna e design profissional.

## 🚀 Tecnologias

- **Frontend:** React 18 + Vite 7.1.9
- **Backend:** Node.js + Express 5.1.0
- **Banco de Dados:** MariaDB 12.0.2
- **Estilo:** CSS3 puro com CSS Variables e design responsivo
- **Ícones:** React Icons
- **Requisições:** Axios
- **Segurança:** Bcrypt para hash de senhas

## ✨ Funcionalidades Implementadas

### Sprint 1 - Fundação da Loja
- ✅ **S1-R1:** Ambiente de desenvolvimento configurado
- ✅ **S1-R2:** Estrutura de banco de dados (produtos, categorias, clientes)
- ✅ **S1-R3:** Catálogo visual de instrumentos
  - Cards de produtos com imagens, preços e avaliações
  - Filtro por categorias (LP/Vinil, Instrumentos, CD, Diversos)
  - Grid responsivo e adaptável
  - Badge de desconto e frete grátis
- ✅ **S1-R4:** Sistema de cadastro de clientes
  - Validação de email único
  - Hash de senha com bcrypt (10 salt rounds)
  - Validações de formulário
- ✅ **S1-R5:** Sistema de login
  - Autenticação com email/senha
  - Sessão persistente em localStorage
  - Proteção de rotas

### Sprint 2 - Sistema de Compras
- ✅ **S2-R1:** Área do Cliente (Meus Pedidos)
  - Histórico completo de pedidos
  - Visualização de detalhes (itens, valores, status)
  - 6 estados de pedido (Aguardando Pagamento, Confirmado, Em Preparação, Enviado, Entregue, Cancelado)
  - Sistema de cancelamento para pedidos pendentes
- ✅ **S2-R2:** Carrinho de Instrumentos Musicais
  - Gerenciamento com Context API
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Badge animado com contador de itens
  - Persistência em localStorage
  - Toast de feedback visual
- ✅ **S2-R3:** Finalizar Compra
  - Formulário de checkout completo
  - Seleção de forma de pagamento (Crédito, Débito, PIX, Boleto)
  - Endereço de entrega obrigatório
  - Campo de observações
  - Validações antes de finalizar
- ✅ **S2-R4:** Gestão de Pedidos
  - Relacionamento Cliente → Pedido → Produtos
  - Status coloridos e ícones visuais
  - Interface responsiva e profissional

### Design e UX
- ✅ Header sticky com logo, busca, ações do usuário e navegação
- ✅ Footer profissional com redes sociais e formas de pagamento
- ✅ Paleta de cores moderna (Roxo #6B46C1, Dourado #D4AF37)
- ✅ Sistema de variáveis CSS para manutenção
- ✅ Animações e transições suaves
- ✅ Design mobile-first totalmente responsivo

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (v16+)
- MariaDB ou MySQL
- npm ou yarn

### 1. Clonar o Repositório

```bash
git clone https://github.com/vickyAqui/loja-musical.git
cd loja-musical
```

### 2. Configurar o Banco de Dados

```bash
# Iniciar o MariaDB (Arch Linux)
sudo systemctl start mariadb

# Importar o schema inicial
mysql -u root -p < loja_musical\ 1.sql

# Criar tabelas de clientes
mysql -u root -p loja_musical < backend/create_clientes_table.sql

# Criar tabelas de pedidos
mysql -u root -p loja_musical < backend/create_pedidos_tables.sql
```

### 3. Configurar o Backend

```bash
cd backend
npm install

# O arquivo .env já está configurado com:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=123
# DB_NAME=loja_musical
# PORT=3001
```

### 4. Configurar o Frontend

```bash
cd frontend
npm install
```

## ▶️ Executar o Projeto

### Terminal 1 - Backend

```bash
cd backend
node src/server.js
```

O backend estará rodando em: `http://localhost:3001`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

O frontend estará rodando em: `http://localhost:5173` ou `http://localhost:5174`

## 📁 Estrutura do Projeto

```
loja-musical/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # Configuração do banco
│   │   ├── routes/
│   │   │   ├── instrumentosRoutes.js    # Rotas de produtos
│   │   │   ├── clientesRoutes.js        # Rotas de clientes
│   │   │   └── pedidosRoutes.js         # Rotas de pedidos
│   │   └── server.js                    # Servidor Express
│   ├── create_clientes_table.sql
│   ├── create_pedidos_tables.sql
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx / .css        # Cabeçalho
│   │   │   ├── ProductCard.jsx / .css   # Card de produto
│   │   │   ├── ProductDetail.jsx / .css # Detalhes do produto
│   │   │   ├── CadastroCliente.jsx / .css # Cadastro
│   │   │   ├── Login.jsx / .css         # Login
│   │   │   ├── MeusPedidos.jsx / .css   # Área de pedidos
│   │   │   ├── Carrinho.jsx / .css      # Carrinho
│   │   │   ├── Footer.jsx / .css        # Rodapé
│   │   │   └── Toast.jsx / .css         # Notificações
│   │   ├── context/
│   │   │   └── CarrinhoContext.jsx      # Context API do carrinho
│   │   ├── App.jsx / .css
│   │   ├── main.jsx
│   │   ├── index.css                    # CSS Variables
│   │   └── variables.css
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Produtos
- `GET /api/instrumentos` - Lista todos os produtos

### Clientes
- `POST /api/clientes` - Cadastrar novo cliente
- `POST /api/clientes/login` - Fazer login
- `GET /api/clientes` - Listar clientes (admin)

### Pedidos
- `GET /api/pedidos/cliente/:clienteId` - Listar pedidos do cliente
- `GET /api/pedidos/:pedidoId` - Detalhes de um pedido
- `POST /api/pedidos` - Criar novo pedido
- `PUT /api/pedidos/:pedidoId/status` - Atualizar status
- `DELETE /api/pedidos/:pedidoId` - Cancelar pedido

## 🎨 Design System

### Paleta de Cores
- **Primary:** `#6B46C1` (Roxo)
- **Primary Light:** `#8257e6`
- **Primary Dark:** `#5a38a3`
- **Gold:** `#D4AF37`
- **Dark:** `#1A1A2E`
- **Accent:** `#FF6B6B`
- **Success:** `#51CF66`
- **Background:** `#F8F9FA`

### Tipografia
- **Fonte Principal:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Logo:** Brush Script MT (cursive, italic)

### Responsividade
- 🖥️ **Desktop:** 1200px+
- 💻 **Tablet:** 768px - 1199px
- 📱 **Mobile:** < 768px

## 🗂️ Banco de Dados

### Tabelas
- **categorias** - Categorias de produtos
- **produtos** - Catálogo de produtos
- **clientes** - Usuários cadastrados
- **pedidos** - Pedidos realizados
- **itens_pedido** - Itens de cada pedido

### Relacionamentos
- Produtos → Categorias (N:1)
- Pedidos → Clientes (N:1)
- Itens_Pedido → Pedidos (N:1)
- Itens_Pedido → Produtos (N:1)

## 📋 Próximas Funcionalidades (Backlog)

- [ ] Hero Section com banner carrossel
- [ ] Filtros avançados (preço, marca, avaliação)
- [ ] Breadcrumb de navegação
- [ ] Enriquecer página de detalhes (galeria, avaliações, especificações)
- [ ] Seções de destaque ("Mais Vendidos", "Ofertas do Dia")
- [ ] Busca com autocomplete
- [ ] Sistema de avaliações
- [ ] Painel administrativo
- [ ] Notificações por email
- [ ] Integração com gateway de pagamento

## 👥 Autor

**Vicky Aquino**
- GitHub: [@vickyAqui](https://github.com/vickyAqui)
- Projeto: [loja-musical](https://github.com/vickyAqui/loja-musical)

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com 💜 usando metodologia Scrum**