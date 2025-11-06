-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Aguardando Pagamento', 'Pagamento Confirmado', 'Em Preparação', 'Enviado', 'Entregue', 'Cancelado') DEFAULT 'Aguardando Pagamento',
  valor_total DECIMAL(10, 2) NOT NULL,
  forma_pagamento VARCHAR(50),
  endereco_entrega TEXT,
  observacoes TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL DEFAULT 1,
  preco_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- Inserir alguns pedidos de exemplo para teste
INSERT INTO pedidos (cliente_id, status, valor_total, forma_pagamento, endereco_entrega) VALUES
(1, 'Entregue', 3499.90, 'Cartão de Crédito', 'Rua das Flores, 123 - São Paulo, SP'),
(1, 'Em Preparação', 1599.00, 'PIX', 'Rua das Flores, 123 - São Paulo, SP'),
(1, 'Aguardando Pagamento', 899.90, 'Boleto', 'Rua das Flores, 123 - São Paulo, SP');

-- Inserir itens dos pedidos de exemplo
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal) VALUES
(1, 1, 1, 3499.90, 3499.90),
(2, 3, 1, 1599.00, 1599.00),
(3, 5, 1, 899.90, 899.90);
