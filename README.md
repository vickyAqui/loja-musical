# 🎵 Loja Musical - Ponte Sonora

Plataforma completa de e-commerce para venda de instrumentos musicais, discos de vinil, CDs e acessórios musicais, desenvolvida com arquitetura moderna e design profissional.

## 🚀 Tecnologias

- **Frontend:** React 18 + Vite 7.1.9
- **Backend:** Node.js + Express 5.1.0
- **Banco de Dados:** MariaDB 12.0.2 / MySQL 8.0+
- **Estilo:** CSS3 puro com CSS Variables e design responsivo
- **Ícones:** React Icons (FiIcons, FaIcons, GiIcons)
- **Requisições:** Axios
- **Segurança:** Bcrypt para hash de senhas
- **Gerenciamento de Estado:** Context API (React)

## ✨ Funcionalidades Implementadas

### Sprint 1 - Fundação da Loja ✅
- **S1-R1:** Ambiente de desenvolvimento configurado
- **S1-R2:** Estrutura de banco de dados (produtos, categorias, clientes)
- **S1-R3:** Catálogo visual de instrumentos
  - Cards de produtos com imagens, preços e avaliações
  - Filtro por categorias (LP/Vinil, Instrumentos, CD, Diversos)
  - Grid responsivo e adaptável
  - Badge de desconto e frete grátis
- **S1-R4:** Sistema de cadastro de clientes
  - Validação de email único
  - Hash de senha com bcrypt (10 salt rounds)
  - Validações de formulário
- **S1-R5:** Sistema de login
  - Autenticação com email/senha
  - Sessão persistente em localStorage
  - Proteção de rotas

### Sprint 2 - Sistema de Compras ✅
- **S2-R1:** Área do Cliente (Meus Pedidos)
  - Histórico completo de pedidos
  - Visualização de detalhes (itens, valores, status)
  - 6 estados de pedido (Aguardando Pagamento, Confirmado, Em Preparação, Enviado, Entregue, Cancelado)
  - Sistema de cancelamento para pedidos pendentes
- **S2-R2:** Carrinho de Instrumentos Musicais
  - Gerenciamento com Context API
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Badge animado com contador de itens
  - Persistência em localStorage
  - Toast de feedback visual
- **S2-R3:** Finalizar Compra
  - Formulário de checkout completo
  - Seleção de forma de pagamento (Crédito, Débito, PIX, Boleto)
  - Endereço de entrega obrigatório
  - Campo de observações
  - Validações antes de finalizar
- **S2-R4:** Gestão de Pedidos
  - Relacionamento Cliente → Pedido → Produtos
  - Status coloridos e ícones visuais
  - Interface responsiva e profissional

### Sprint 3 - Recursos Avançados ✅
- **S3-R1:** Sistema de Busca Avançada
  - Busca por nome e marca de produtos
  - Debounce de 300ms para otimização
  - Busca em tempo real
- **S3-R2:** Filtros Avançados
  - Filtro por tipo de instrumento
  - Filtro por faixa de preço (slider)
  - Sidebar/modal responsivo
- **S3-R3:** Sistema de Avaliações
  - Avaliação de 1 a 5 estrelas (douradas)
  - Comentários de clientes
  - Média de avaliações por produto
  - CRUD de avaliações (criar, editar, deletar próprias)
  - Restrição: 1 avaliação por cliente/produto
- **S3-R4:** Loja Musical Responsiva (Mobile)
  - Breakpoints: 1024px, 768px, 480px
  - Grid adaptativo (4 → 3 → 2 → 1 coluna)
  - Navegação mobile otimizada
  - Touch gestures
- **S3-R5:** Painel Admin da Loja Musical
  - Sistema de autenticação admin separado
  - Dashboard com estatísticas (total produtos, clientes, pedidos, vendas)
  - Gerenciar Produtos (CRUD completo)
  - Gerenciar Pedidos (visualização e mudança de status)
  - Lista de Clientes com estatísticas
  - Acesso via botão no Header

### Design e UX 🎨
- Header sticky com logo, busca, ações do usuário e navegação
- Footer profissional com categorias, contato, redes sociais e formas de pagamento
- Paleta de cores moderna (Roxo #6B46C1, Dourado #D4AF37)
- Sistema de variáveis CSS para manutenção
- Animações e transições suaves
- Design mobile-first totalmente responsivo
- Toast notifications para feedback do usuário

---

## 🛠️ Instalação e Configuração

### 📋 Pré-requisitos

#### Para ambos os sistemas (Linux e Windows):
- **Node.js** v16 ou superior ([Download](https://nodejs.org/))
- **npm** (vem com Node.js) ou **yarn**
- **MariaDB** ou **MySQL** 8.0+
- **Git** para clonar o repositório

---

## 💻 Instalação no Linux (Arch/Ubuntu/Debian)

### 1️⃣ Instalar Node.js e npm

#### Arch Linux:
```bash
sudo pacman -S nodejs npm
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install nodejs npm
```

Verificar instalação:
```bash
node --version  # v16+ recomendado
npm --version
```

### 2️⃣ Instalar MariaDB

#### Arch Linux:
```bash
sudo pacman -S mariadb
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
```

#### Ubuntu/Debian:
```bash
sudo apt install mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
```

### 3️⃣ Clonar o Repositório
```bash
git clone https://github.com/vickyAqui/loja-musical.git
cd loja-musical
```

### 4️⃣ Configurar Banco de Dados
```bash
# Acessar MariaDB
sudo mariadb -u root -p

# Dentro do MariaDB, executar:
CREATE DATABASE loja_musical;
USE loja_musical;
SOURCE /caminho/completo/loja-musical/loja_musical\ 1.sql;
exit;

# Criar tabelas adicionais
sudo mariadb -u root -p loja_musical < backend/create_clientes_table.sql
sudo mariadb -u root -p loja_musical < backend/create_pedidos_tables.sql
```

**Criar tabela de avaliações:**
```bash
sudo mariadb -u root -p123 loja_musical
```
```sql
CREATE TABLE avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  cliente_id INT NOT NULL,
  nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario TEXT,
  data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_cliente_produto (cliente_id, produto_id)
);
```

**Criar tabela de administradores:**
```sql
CREATE TABLE administradores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir admin padrão (senha: admin123)
INSERT INTO administradores (nome, email, senha) 
VALUES ('Administrador', 'admin@lojamusical.com', '$2b$10$DmGoRAw.SxsWrfuflYdT6O9mi5sQPIJHIaIxXcON4hdwincjlgX7a');
```

### 5️⃣ Instalar Dependências

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 6️⃣ Configurar Variáveis de Ambiente

O arquivo `.env` no backend já está configurado. Se necessário, ajuste:
```bash
cd backend
nano .env  # ou vim .env
```
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=loja_musical
PORT=3001
```

### 7️⃣ Executar o Projeto

**Terminal 1 - Backend:**
```bash
cd backend
node src/server.js
```
✅ Backend rodando em: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend rodando em: `http://localhost:5173`

---

## 🪟 Instalação no Windows

### 1️⃣ Instalar Node.js e npm

1. Baixar o instalador do Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Executar o instalador e seguir as instruções
3. Abrir o **Prompt de Comando (CMD)** ou **PowerShell**
4. Verificar instalação:
```cmd
node --version
npm --version
```

### 2️⃣ Instalar MariaDB ou MySQL

#### Opção A: MariaDB
1. Baixar: [https://mariadb.org/download/](https://mariadb.org/download/)
2. Executar o instalador
3. Durante a instalação:
   - Definir senha do root: `123` (ou outra de sua preferência)
   - Marcar "Install as Windows Service"
4. Adicionar ao PATH (se necessário):
   - Painel de Controle → Sistema → Configurações Avançadas → Variáveis de Ambiente
   - Adicionar `C:\Program Files\MariaDB xx.x\bin` ao PATH

#### Opção B: MySQL
1. Baixar: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Executar MySQL Installer
3. Escolher "Developer Default"
4. Definir senha do root: `123`

Verificar instalação:
```cmd
mysql --version
```

### 3️⃣ Instalar Git (se não tiver)
1. Baixar: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Executar instalador (deixar opções padrão)

### 4️⃣ Clonar o Repositório
Abrir **Git Bash** ou **CMD**:
```cmd
git clone https://github.com/vickyAqui/loja-musical.git
cd loja-musical
```

### 5️⃣ Configurar Banco de Dados

Abrir **MySQL Command Line Client** ou executar no CMD:
```cmd
mysql -u root -p
```
Digitar a senha (`123`) e executar:

```sql
CREATE DATABASE loja_musical;
USE loja_musical;
SOURCE C:/caminho/completo/loja-musical/loja_musical 1.sql;
exit;
```

**Criar tabelas adicionais:**
```cmd
mysql -u root -p123 loja_musical < backend/create_clientes_table.sql
mysql -u root -p123 loja_musical < backend/create_pedidos_tables.sql
```

**Criar tabelas de avaliações e administradores:**
```cmd
mysql -u root -p123 loja_musical
```
```sql
CREATE TABLE avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  cliente_id INT NOT NULL,
  nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario TEXT,
  data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_cliente_produto (cliente_id, produto_id)
);

CREATE TABLE administradores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO administradores (nome, email, senha) 
VALUES ('Administrador', 'admin@lojamusical.com', '$2b$10$DmGoRAw.SxsWrfuflYdT6O9mi5sQPIJHIaIxXcON4hdwincjlgX7a');
exit;
```

### 6️⃣ Instalar Dependências

Abrir **CMD** ou **PowerShell** na pasta do projeto:

**Backend:**
```cmd
cd backend
npm install
```

**Frontend:**
```cmd
cd ..\frontend
npm install
```

### 7️⃣ Configurar Variáveis de Ambiente

O arquivo `.env` no backend já está configurado. Se necessário:
```cmd
cd backend
notepad .env
```
Verificar/ajustar:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=loja_musical
PORT=3001
```

### 8️⃣ Executar o Projeto

**Terminal/CMD 1 - Backend:**
```cmd
cd backend
node src/server.js
```
✅ Backend rodando em: `http://localhost:3001`

**Terminal/CMD 2 - Frontend:**
```cmd
cd frontend
npm run dev
```
✅ Frontend rodando em: `http://localhost:5173`

---

## 🌐 Acessar a Aplicação

Abra o navegador e acesse: **http://localhost:5173**

### � Credenciais de Teste

**Admin:**
- Email: `admin@lojamusical.com`
- Senha: `admin123`

**Cliente** (crie sua própria conta através do botão "Cadastre-se")

---