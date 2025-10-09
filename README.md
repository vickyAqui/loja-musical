# Loja Musical

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