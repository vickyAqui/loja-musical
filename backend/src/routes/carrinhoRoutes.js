const express = require('express');
const connection = require('../config/db');
const { verificarToken } = require('./authRoutes');

const router = express.Router();

// Buscar carrinho do cliente (S2-R2)
router.get('/', verificarToken, (req, res) => {
  const clienteId = req.usuario.id;

  const query = `
    SELECT c.id, c.quantidade, c.instrumento_id,
           i.nome, i.preco, i.imagem, i.quantidade as estoque
    FROM carrinho c
    INNER JOIN instrumentos i ON c.instrumento_id = i.id
    WHERE c.cliente_id = ?
  `;

  connection.query(query, [clienteId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }

    res.json(results);
  });
});

// Adicionar item ao carrinho
router.post('/', verificarToken, (req, res) => {
  const clienteId = req.usuario.id;
  const { instrumento_id, quantidade } = req.body;

  if (!instrumento_id || !quantidade || quantidade <= 0) {
    return res.status(400).json({ error: 'Instrumento e quantidade válida são obrigatórios' });
  }

  // Verificar estoque
  connection.query(
    'SELECT quantidade FROM instrumentos WHERE id = ?',
    [instrumento_id],
    (err, results) => {
      if (err) {
        console.error('Erro ao verificar estoque:', err);
        return res.status(500).json({ error: 'Erro ao verificar estoque' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Instrumento não encontrado' });
      }

      const estoque = results[0].quantidade;

      if (quantidade > estoque) {
        return res.status(400).json({ error: 'Quantidade indisponível em estoque' });
      }

      // Adicionar ou atualizar carrinho
      const query = `
        INSERT INTO carrinho (cliente_id, instrumento_id, quantidade)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)
      `;

      connection.query(query, [clienteId, instrumento_id, quantidade], (err, result) => {
        if (err) {
          console.error('Erro ao adicionar ao carrinho:', err);
          return res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
        }

        res.status(201).json({ message: 'Item adicionado ao carrinho' });
      });
    }
  );
});

// Atualizar quantidade de item no carrinho
router.put('/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;
  const clienteId = req.usuario.id;

  if (!quantidade || quantidade <= 0) {
    return res.status(400).json({ error: 'Quantidade inválida' });
  }

  connection.query(
    'UPDATE carrinho SET quantidade = ? WHERE id = ? AND cliente_id = ?',
    [quantidade, id, clienteId],
    (err, result) => {
      if (err) {
        console.error('Erro ao atualizar carrinho:', err);
        return res.status(500).json({ error: 'Erro ao atualizar carrinho' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }

      res.json({ message: 'Carrinho atualizado' });
    }
  );
});

// Remover item do carrinho
router.delete('/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const clienteId = req.usuario.id;

  connection.query(
    'DELETE FROM carrinho WHERE id = ? AND cliente_id = ?',
    [id, clienteId],
    (err, result) => {
      if (err) {
        console.error('Erro ao remover do carrinho:', err);
        return res.status(500).json({ error: 'Erro ao remover do carrinho' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }

      res.json({ message: 'Item removido do carrinho' });
    }
  );
});

// Limpar carrinho
router.delete('/', verificarToken, (req, res) => {
  const clienteId = req.usuario.id;

  connection.query(
    'DELETE FROM carrinho WHERE cliente_id = ?',
    [clienteId],
    (err) => {
      if (err) {
        console.error('Erro ao limpar carrinho:', err);
        return res.status(500).json({ error: 'Erro ao limpar carrinho' });
      }

      res.json({ message: 'Carrinho limpo com sucesso' });
    }
  );
});

module.exports = router;
