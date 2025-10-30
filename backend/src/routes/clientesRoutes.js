const express = require('express');
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Cadastrar novo cliente (S1-R4)
router.post('/', async (req, res) => {
  const { nome, email, senha, cpf, telefone, endereco, cidade, estado, cep } = req.body;

  // Validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  try {
    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO clientes (nome, email, senha, cpf, telefone, endereco, cidade, estado, cep)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [nome, email, senhaHash, cpf, telefone, endereco, cidade, estado, cep],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
          }
          console.error('Erro ao cadastrar cliente:', err);
          return res.status(500).json({ error: 'Erro ao cadastrar cliente' });
        }

        res.status(201).json({
          message: 'Cliente cadastrado com sucesso',
          clienteId: result.insertId
        });
      }
    );
  } catch (error) {
    console.error('Erro ao processar cadastro:', error);
    res.status(500).json({ error: 'Erro ao processar cadastro' });
  }
});

// Buscar cliente por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'SELECT id, nome, email, cpf, telefone, endereco, cidade, estado, cep FROM clientes WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Erro ao buscar cliente:', err);
        return res.status(500).json({ error: 'Erro ao buscar cliente' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      res.json(results[0]);
    }
  );
});

// Atualizar dados do cliente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco, cidade, estado, cep } = req.body;

  const query = `
    UPDATE clientes 
    SET nome = ?, telefone = ?, endereco = ?, cidade = ?, estado = ?, cep = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [nome, telefone, endereco, cidade, estado, cep, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao atualizar cliente:', err);
        return res.status(500).json({ error: 'Erro ao atualizar cliente' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      res.json({ message: 'Cliente atualizado com sucesso' });
    }
  );
});

module.exports = router;
