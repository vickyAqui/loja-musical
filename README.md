# 🎵 Loja Musical - Ponte Sonora

Plataforma de e-commerce para venda de instrumentos musicais, discos de vinil, CDs e acessórios.

## 🚀 Tecnologias

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Banco de Dados:** MariaDB/MySQL
- **Estilo:** CSS puro com design responsivo

## 📋 Funcionalidades Implementadas

- ✅ Catálogo visual de produtos com cards
- ✅ Filtro por categorias (LP/Vinil, Instrumentos, CD, Diversos)
- ✅ Header com logo, busca e carrinho
- ✅ Menu de navegação
- ✅ Grid responsivo de produtos
- ✅ Integração com API REST
- ✅ Design mobile-first

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
# Iniciar o MariaDB
sudo systemctl start mariadb

# Importar o schema e dados
mysql -u root -p < loja_musical\ 1.sql
```

### 3. Configurar o Backend

```bash
cd backend
npm install

# Configurar variáveis de ambiente (.env já está configurado)
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

O frontend estará rodando em: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
loja-musical/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # Configuração do banco
│   │   ├── routes/
│   │   │   └── instrumentosRoutes.js  # Rotas da API
│   │   └── server.js          # Servidor Express
│   ├── .env                   # Variáveis de ambiente
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx     # Cabeçalho da loja
│   │   │   ├── Header.css
│   │   │   ├── ProductCard.jsx # Card de produto
│   │   │   └── ProductCard.css
│   │   ├── App.jsx            # Página principal
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🎯 Sprint S1-R3: Catálogo Visual de Instrumentos

### Tarefas Concluídas

- [x] Criar página inicial da loja musical
- [x] Fazer cards para instrumentos (foto, nome, preço)
- [x] Conectar frontend com API de produtos
- [x] Validar layout mobile para instrumentos

### Próximas Tarefas

- [ ] Criar página de detalhes do produto
- [ ] Implementar funcionalidade de busca
- [ ] Adicionar carrinho de compras
- [ ] Sistema de cadastro/login

## 🔗 API Endpoints

### GET `/api/instrumentos`

Retorna todos os produtos do catálogo.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Violão Clássico",
    "preco": 599.99,
    "marca": "Giannini",
    "categoria_id": 1,
    "imagem_url": "https://..."
  }
]
```

## 📱 Design Responsivo

O layout se adapta automaticamente para:
- 🖥️ Desktop (1200px+)
- 💻 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🎨 Paleta de Cores

- **Header:** `#c0c0c0` (cinza claro)
- **Menu:** `#000000` (preto)
- **Background:** `#8B0000` (vermelho escuro)
- **Cards:** `#e8e8e8` (cinza claro)
- **Preços:** `#8B0000` (vermelho escuro)

## 👥 Autor

**Vicky Aquino**
- GitHub: [@vickyAqui](https://github.com/vickyAqui)

## 📄 Licença

Este projeto está sob a licença ISC.

Projeto de uma loja de instrumentos musicais desenvolvido com React, Node.js, Express e MySQL.

## Tecnologias utilizadas

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de Dados: MySQL
- Requisições HTTP: Axios

## Como rodar o projeto

### Backend

1. Acesse a pasta backend:
   ```bash
   cd backend

2. Instale as dependências:
    ```bash
    npm install

3. Crie um arquivo .env com as variáveis de ambiente para o banco de dados:
    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=loja_musical
    PORT=3001

4. Inicie o servidor:
    node src/server.js

### Frontend

1. Acesse a pasta frontend:
    ```bash
    cd frontend

2. Instale as dependências:
    ```bash
    npm install

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev

## API

### Endpoints disponíveis

- `GET /api/instrumentos` - Lista todos os instrumentos.

(Outros endpoints serão adicionados em breve)

## Testes

Você pode testar os endpoints utilizando o [Postman](https://www.postman.com/).