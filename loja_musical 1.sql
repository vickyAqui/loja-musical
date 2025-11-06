CREATE DATABASE IF NOT EXISTS loja_musical;
USE loja_musical;
-- Tabela de instrumentos (caso queira manter separada de produtos)
CREATE TABLE IF NOT EXISTS instrumentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    preco DECIMAL(10,2),
    quantidade INT,
    descricao TEXT,
    imagem_url VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Tabela de produtos com chave estrangeira para categorias
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    marca VARCHAR(50),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Inserção das categorias
INSERT INTO categorias (nome) VALUES
('Cordas'),
('Percussão'),
('Sopro'),
('Teclados');

INSERT INTO produtos (nome, preco, marca, categoria_id) VALUES
('Violão Clássico', 599.99, 'Giannini', 1),
('Guitarra Stratocaster', 2100.00, 'Fender', 1),
('Violino Estudante', 899.99, 'Eagle', 1),
('Bateria Acústica', 3200.00, 'Pearl', 2),
('Pandeiro 10"', 79.90, 'Contemporânea', 2),
('Caixa de Bateria', 799.90, 'Tama', 2),
('Flauta Doce', 49.90, 'Yamaha', 3),
('Saxofone Alto', 4500.00, 'Selmer', 3),
('Teclado Arranjador', 1200.00, 'Casio', 4),
('Piano Digital', 5500.00, 'Yamaha', 4);


-- Exemplo de consulta: todos produtos com nome "violão"
SELECT * FROM produtos
WHERE nome LIKE '%violão%';

-- Consulta com JOIN para mostrar nome da categoria junto
SELECT 
    p.nome AS produto, 
    p.preco, 
    p.marca, 
    c.nome AS categoria
FROM produtos p
JOIN categorias c ON p.categoria_id = c.id;
