# Documentação das Sprints - Loja Musical

## Sprint 1

### S1-R3: Criar Catálogo Visual de Instrumentos ✅

**Implementação:**
- Componente `InstrumentosPage.jsx` com design de cards
- Grid responsivo adaptável a diferentes tamanhos de tela
- Sistema de filtros por categoria
- Badges visuais para categorias
- Informações de preço e estoque
- Botão de adicionar ao carrinho integrado
- CSS moderno com efeitos hover e transições

**Arquivos:**
- `/frontend/src/pages/InstrumentosPage.jsx`
- `/frontend/src/styles/Instrumentos.css`

### S1-R4: Cadastro de Clientes da Loja Musical ✅

**Implementação Backend:**
- Rota `POST /api/clientes` para cadastro
- Validação de dados obrigatórios
- Criptografia de senha com bcrypt
- Verificação de duplicidade (email e CPF)
- Campos: nome, email, senha, cpf, telefone, endereço completo

**Implementação Frontend:**
- Componente `Cadastro.jsx` com formulário completo
- Validação de senhas coincidentes
- Feedback visual de erros e sucesso
- Redirecionamento automático após cadastro
- Design responsivo e intuitivo

**Arquivos:**
- `/backend/src/routes/clientesRoutes.js`
- `/frontend/src/pages/Cadastro.jsx`
- `/frontend/src/styles/Cadastro.css`

### S1-R5: Login para Comprar Instrumentos ✅

**Implementação Backend:**
- Rota `POST /api/auth/login` com JWT
- Verificação de credenciais
- Geração de token com validade de 24h
- Middleware de verificação de token
- Rota de verificação de token válido

**Implementação Frontend:**
- Componente `Login.jsx`
- Context API para gerenciamento de autenticação
- Armazenamento de token no localStorage
- Proteção de rotas que requerem login
- Header de autorização automático nas requisições
- Feedback de login bem-sucedido ou com erro

**Arquivos:**
- `/backend/src/routes/authRoutes.js`
- `/frontend/src/pages/Login.jsx`
- `/frontend/src/context/AuthContext.jsx`
- `/frontend/src/styles/Login.css`

---

## Sprint 2

### S2-R1: Área do Cliente (Meus Pedidos) ✅

**Implementação Backend:**
- Rota `GET /api/pedidos/meus-pedidos` (autenticada)
- Rota `GET /api/pedidos/:id` para detalhes
- Listagem de pedidos com informações resumidas
- Detalhamento completo de cada pedido com itens

**Implementação Frontend:**
- Componente `MeusPedidos.jsx` com lista de pedidos
- Componente `DetalhesPedido.jsx` para visualização completa
- Badges coloridos por status do pedido
- Histórico completo de compras
- Navegação entre lista e detalhes
- Informações de data, status, total e itens

**Arquivos:**
- `/backend/src/routes/pedidosRoutes.js`
- `/frontend/src/pages/MeusPedidos.jsx`
- `/frontend/src/pages/DetalhesPedido.jsx`
- `/frontend/src/styles/MeusPedidos.css`
- `/frontend/src/styles/DetalhesPedido.css`

### S2-R2: Carrinho de Instrumentos Musicais ✅

**Implementação Backend:**
- Rota `GET /api/carrinho` - listar itens
- Rota `POST /api/carrinho` - adicionar item
- Rota `PUT /api/carrinho/:id` - atualizar quantidade
- Rota `DELETE /api/carrinho/:id` - remover item
- Rota `DELETE /api/carrinho` - limpar carrinho
- Verificação de estoque disponível
- Prevenção de duplicação de itens

**Implementação Frontend:**
- Componente `Carrinho.jsx` completo
- Context API para gerenciamento do carrinho
- Badge de contador na navbar
- Controles de quantidade (+/-)
- Remoção de itens com confirmação
- Cálculo automático de subtotais e total
- Validação de estoque
- Botão de finalizar compra

**Arquivos:**
- `/backend/src/routes/carrinhoRoutes.js`
- `/frontend/src/pages/Carrinho.jsx`
- `/frontend/src/context/CarrinhoContext.jsx`
- `/frontend/src/styles/Carrinho.css`

### S2-R3: Finalizar Compra de Instrumentos ✅

**Implementação Backend:**
- Rota `POST /api/pedidos` com transação SQL
- Validação de carrinho não vazio
- Verificação de estoque antes da compra
- Criação do pedido com todos os itens
- Atualização automática do estoque
- Limpeza automática do carrinho
- Rollback em caso de erro

**Implementação Frontend:**
- Componente `Checkout.jsx` com formulário
- Validação de endereço de entrega
- Resumo do pedido antes da confirmação
- Componente `PedidoConfirmado.jsx` com sucesso
- Exibição de número do pedido
- Links para acompanhamento e nova compra
- Loading durante processamento

**Arquivos:**
- `/backend/src/routes/pedidosRoutes.js`
- `/frontend/src/pages/Checkout.jsx`
- `/frontend/src/pages/PedidoConfirmado.jsx`
- `/frontend/src/styles/Checkout.css`
- `/frontend/src/styles/PedidoConfirmado.css`

### S2-R4: Gestão de Pedidos da Loja Musical ✅

**Implementação Backend:**
- Rota `GET /api/pedidos/admin/todos` - listar todos os pedidos
- Rota `PUT /api/pedidos/admin/:id/status` - atualizar status
- Informações completas de cliente e pedido
- Estados: pendente, confirmado, enviado, entregue, cancelado

**Implementação Frontend:**
- Componente `Admin.jsx` - painel administrativo
- Tabela responsiva com todos os pedidos
- Filtros e ordenação
- Dropdown para mudança de status
- Estatísticas de pedidos
- Cards com métricas (total, pendentes, entregues)
- Design profissional de dashboard

**Arquivos:**
- `/backend/src/routes/pedidosRoutes.js`
- `/frontend/src/pages/Admin.jsx`
- `/frontend/src/styles/Admin.css`

---

## Estrutura do Banco de Dados

### Tabela: instrumentos
- id (PK)
- nome
- descricao
- preco
- quantidade (estoque)
- imagem
- categoria
- created_at

### Tabela: clientes
- id (PK)
- nome
- email (UNIQUE)
- senha (hash)
- cpf (UNIQUE)
- telefone
- endereco
- cidade
- estado
- cep
- created_at

### Tabela: pedidos
- id (PK)
- cliente_id (FK)
- total
- status (ENUM)
- data_pedido
- endereco_entrega
- observacoes

### Tabela: itens_pedido
- id (PK)
- pedido_id (FK)
- instrumento_id (FK)
- quantidade
- preco_unitario
- subtotal

### Tabela: carrinho
- id (PK)
- cliente_id (FK)
- instrumento_id (FK)
- quantidade
- created_at
- UNIQUE (cliente_id, instrumento_id)

---

## Fluxo de Uso

1. **Cadastro**: Cliente se registra no sistema
2. **Login**: Cliente faz login e recebe token JWT
3. **Navegação**: Cliente navega pelo catálogo de instrumentos
4. **Carrinho**: Cliente adiciona produtos ao carrinho
5. **Checkout**: Cliente finaliza a compra com endereço
6. **Confirmação**: Sistema processa e confirma o pedido
7. **Acompanhamento**: Cliente visualiza pedidos em "Meus Pedidos"
8. **Gestão**: Admin gerencia status dos pedidos

---

## Recursos Adicionais Implementados

- ✅ Sistema de navegação completo com React Router
- ✅ Context API para estado global (Auth e Carrinho)
- ✅ Design responsivo para todas as telas
- ✅ Feedback visual para todas as ações
- ✅ Tratamento de erros consistente
- ✅ Loading states
- ✅ Validações front e backend
- ✅ Transações SQL para integridade de dados
- ✅ Componente Navbar dinâmico
- ✅ Página Home com apresentação da loja

---

## Tecnologias e Bibliotecas

**Backend:**
- Express 5.1.0
- MySQL2 3.15.2
- JWT (jsonwebtoken 9.0.2)
- Bcrypt (bcryptjs 2.4.3)
- CORS 2.8.5
- Dotenv 17.2.3

**Frontend:**
- React 19.1.1
- React Router DOM 6.22.0
- Axios 1.12.2
- Vite 7.1.7

---

## Conclusão

Todas as funcionalidades das Sprints 1, 2 e 3 foram implementadas com sucesso, incluindo:
- Interface visual moderna e responsiva
- Sistema completo de autenticação
- Gestão de carrinho de compras
- Processo de checkout e finalização
- Área do cliente com histórico
- Painel administrativo de gestão

O projeto está pronto para apresentação ao professor! 🎵
