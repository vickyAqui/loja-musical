const express = require('express');
const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Segredo para JWT (em produção, use variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_aqui_mude_em_producao';

// Login (S1-R5)
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  connection.query(
    'SELECT * FROM clientes WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        console.error('Erro ao buscar cliente:', err);
        return res.status(500).json({ error: 'Erro ao processar login' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      const cliente = results[0];

      // Verificar senha
      const senhaValida = await bcrypt.compare(senha, cliente.senha);

      if (!senhaValida) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: cliente.id, email: cliente.email, nome: cliente.nome },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        token,
        cliente: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email
        }
      });
    }
  );
});

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

// Rota para verificar se o token é válido
router.get('/verificar', verificarToken, (req, res) => {
  res.json({
    message: 'Token válido',
    usuario: req.usuario
  });
});

module.exports = { router, verificarToken };
