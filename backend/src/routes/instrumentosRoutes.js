const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// GET - Listar todos os produtos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar instrumentos:', err);
      res.status(500).send('Erro ao buscar instrumentos');
    } else {
      res.json(results);
    }
  });
});

// GET - Buscar produtos por nome ou marca
router.get('/buscar', (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim() === '') {
    return res.json([]);
  }
  
  const searchTerm = `%${q}%`;
  const query = `
    SELECT * FROM produtos 
    WHERE nome LIKE ? OR marca LIKE ?
    ORDER BY nome ASC
  `;
  
  connection.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
