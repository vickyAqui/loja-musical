-- Criar tabela de clientes
USE loja_musical;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir alguns clientes de exemplo (para teste)
-- Senhas: todas são "senha123" criptografadas
SELECT 'Tabela clientes criada com sucesso!' AS mensagem;
