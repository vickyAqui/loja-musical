# Exemplos de Requisições API - Loja Musical

Este arquivo contém exemplos de como testar a API usando curl ou ferramentas como Postman/Insomnia.

## 1. Instrumentos

### Listar todos os instrumentos
```bash
curl http://localhost:3001/api/instrumentos
```

## 2. Clientes

### Cadastrar novo cliente
```bash
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123",
    "cpf": "12345678900",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }'
```

### Buscar cliente por ID
```bash
curl http://localhost:3001/api/clientes/1
```

## 3. Autenticação

### Fazer login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "senha123"
  }'
```

Salve o token retornado para usar nas próximas requisições!

### Verificar token
```bash
curl http://localhost:3001/api/auth/verificar \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 4. Carrinho (Requer autenticação)

### Listar itens do carrinho
```bash
curl http://localhost:3001/api/carrinho \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Adicionar item ao carrinho
```bash
curl -X POST http://localhost:3001/api/carrinho \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "instrumento_id": 1,
    "quantidade": 2
  }'
```

### Atualizar quantidade no carrinho
```bash
curl -X PUT http://localhost:3001/api/carrinho/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "quantidade": 3
  }'
```

### Remover item do carrinho
```bash
curl -X DELETE http://localhost:3001/api/carrinho/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Limpar carrinho
```bash
curl -X DELETE http://localhost:3001/api/carrinho \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 5. Pedidos (Requer autenticação)

### Criar novo pedido (Finalizar compra)
```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "endereco_entrega": "Rua das Flores, 123 - São Paulo, SP",
    "observacoes": "Entregar no período da manhã"
  }'
```

### Listar meus pedidos
```bash
curl http://localhost:3001/api/pedidos/meus-pedidos \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Buscar detalhes de um pedido
```bash
curl http://localhost:3001/api/pedidos/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Listar todos os pedidos (ADMIN)
```bash
curl http://localhost:3001/api/pedidos/admin/todos \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Atualizar status do pedido (ADMIN)
```bash
curl -X PUT http://localhost:3001/api/pedidos/admin/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "status": "enviado"
  }'
```

Status válidos: pendente, confirmado, enviado, entregue, cancelado

---

## Fluxo de Teste Completo

### 1. Cadastrar um cliente
```bash
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste User","email":"teste@email.com","senha":"123456"}'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'
```

### 3. Adicionar produtos ao carrinho
```bash
curl -X POST http://localhost:3001/api/carrinho \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"instrumento_id":1,"quantidade":1}'
```

### 4. Ver carrinho
```bash
curl http://localhost:3001/api/carrinho \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 5. Finalizar compra
```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"endereco_entrega":"Meu endereço completo"}'
```

### 6. Ver meus pedidos
```bash
curl http://localhost:3001/api/pedidos/meus-pedidos \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## Usando Postman/Insomnia

1. Importe os endpoints acima
2. Crie uma variável de ambiente para o token
3. Configure o header Authorization com o token após login
4. Teste o fluxo completo

---

## Códigos de Status HTTP

- 200: OK - Requisição bem-sucedida
- 201: Created - Recurso criado com sucesso
- 400: Bad Request - Dados inválidos
- 401: Unauthorized - Não autenticado ou token inválido
- 404: Not Found - Recurso não encontrado
- 500: Internal Server Error - Erro no servidor

---

## Dicas

- Sempre salve o token JWT após o login
- O token expira em 24 horas
- Use o Postman para facilitar os testes
- Verifique o console do backend para logs de erro
- Certifique-se de que o banco de dados está rodando
