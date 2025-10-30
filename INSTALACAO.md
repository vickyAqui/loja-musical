# Guia de Instalação Completa - Loja Musical

Este guia irá te ajudar a configurar todo o projeto passo a passo.

## Passo 1: Instalar Dependências do Backend

```powershell
cd backend
npm install
```

## Passo 2: Configurar Banco de Dados

1. Certifique-se de que o MySQL está instalado e rodando
2. Crie o arquivo .env na pasta backend (copie do .env.example):

```powershell
# Na pasta backend
Copy-Item .env.example .env
```

3. Edite o arquivo .env com suas credenciais do MySQL

4. Crie o banco de dados no MySQL:

```powershell
# Opção 1: Usar MySQL Workbench
# - Abra o arquivo backend/database/schema.sql
# - Execute o script

# Opção 2: Via linha de comando
mysql -u root -p < database/schema.sql
```

## Passo 3: Instalar Dependências do Frontend

```powershell
cd ../frontend
npm install
```

## Passo 4: Iniciar a Aplicação

### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

## Verificação

- Backend rodando em: http://localhost:3001
- Frontend rodando em: http://localhost:5173
- Teste acessando: http://localhost:5173

## Problemas Comuns

### Erro de conexão com banco de dados
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo .env
- Certifique-se de que o banco 'loja_musical' foi criado

### Erro de porta em uso
- Mude a porta no arquivo .env (backend) ou vite.config.js (frontend)

### Dependências não instaladas
- Delete a pasta node_modules e package-lock.json
- Execute npm install novamente

## Próximos Passos

1. Acesse http://localhost:5173
2. Crie uma conta em "Cadastrar"
3. Faça login
4. Navegue pelo catálogo e adicione produtos ao carrinho
5. Finalize uma compra
6. Veja seus pedidos em "Meus Pedidos"
7. Acesse o painel admin em "/admin"

Boa sorte com o projeto! 🎵
