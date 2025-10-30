-- Banco de Dados: Loja Musical
-- Criação das tabelas para o sistema

-- Tabela de Instrumentos
CREATE TABLE IF NOT EXISTS instrumentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  imagem VARCHAR(255),
  categoria VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pendente', 'confirmado', 'enviado', 'entregue', 'cancelado') DEFAULT 'pendente',
  data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  endereco_entrega TEXT,
  observacoes TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  instrumento_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (instrumento_id) REFERENCES instrumentos(id)
);

-- Tabela de Carrinho
CREATE TABLE IF NOT EXISTS carrinho (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  instrumento_id INT NOT NULL,
  quantidade INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  FOREIGN KEY (instrumento_id) REFERENCES instrumentos(id) ON DELETE CASCADE,
  UNIQUE KEY unique_carrinho (cliente_id, instrumento_id)
);

-- Inserir alguns instrumentos de exemplo
INSERT INTO instrumentos (nome, descricao, preco, quantidade, categoria) VALUES
('Violão Acústico', 'Violão acústico com cordas de aço, ideal para iniciantes', 450.00, 15, 'Cordas'),
('Guitarra Elétrica', 'Guitarra elétrica stratocaster com captadores single coil', 1200.00, 8, 'Cordas'),
('Baixo 4 Cordas', 'Baixo elétrico precision bass com 4 cordas', 980.00, 10, 'Cordas'),
('Bateria Acústica', 'Bateria acústica completa com 5 tambores e pratos', 2500.00, 5, 'Percussão'),
('Teclado Musical', 'Teclado arranjador com 61 teclas sensíveis', 1800.00, 12, 'Teclas'),
('Saxofone Alto', 'Saxofone alto em mi bemol com estojo', 3200.00, 4, 'Sopro'),
('Violino 4/4', 'Violino tamanho 4/4 com arco e estojo', 850.00, 7, 'Cordas'),
('Flauta Transversal', 'Flauta transversal em dó prateada', 680.00, 9, 'Sopro');
