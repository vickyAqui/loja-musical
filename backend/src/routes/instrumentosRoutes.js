const express = require('express');
const connection = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM instrumentos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar instrumentos:', err);
      res.status(500).send('Erro ao buscar instrumentos');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
