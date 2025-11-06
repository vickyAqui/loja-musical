const express = require('express');
const db = require('../config/db');

const router = express.Router();

// GET - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM produtos');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar instrumentos:', err);
    res.status(500).send('Erro ao buscar instrumentos');
  }
});

// GET - Buscar produtos por nome ou marca
router.get('/buscar', async (req, res) => {
  try {
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
    
    const [results] = await db.query(query, [searchTerm, searchTerm]);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
