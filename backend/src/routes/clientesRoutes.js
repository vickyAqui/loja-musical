const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

// POST /api/clientes - Cadastrar novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        erro: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        erro: 'Email inválido' 
      });
    }

    // Validação de senha forte (mínimo 6 caracteres)
    if (senha.length < 6) {
      return res.status(400).json({ 
        erro: 'A senha deve ter no mínimo 6 caracteres' 
      });
    }

    // Verificar se email já existe
    const [results] = await db.query('SELECT id FROM clientes WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(409).json({ 
        erro: 'Este email já está cadastrado' 
      });
    }

    // Criptografar senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Inserir cliente no banco
    const insertQuery = `
      INSERT INTO clientes (nome, email, senha, telefone) 
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await db.query(insertQuery, [nome, email, senhaHash, telefone || null]);

    res.status(201).json({
      mensagem: 'Cliente cadastrado com sucesso!',
      clienteId: result.insertId
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/clientes - Listar todos os clientes (sem senha)
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT id, nome, email, telefone, created_at FROM clientes');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

// POST /api/clientes/login - Autenticar cliente
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação dos campos
    if (!email || !senha) {
      return res.status(400).json({ 
        erro: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar cliente por email
    const [results] = await db.query(
      'SELECT id, nome, email, telefone, senha FROM clientes WHERE email = ?',
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ 
        erro: 'Email ou senha incorretos' 
      });
    }

    const cliente = results[0];

    // Comparar senha
    const senhaValida = await bcrypt.compare(senha, cliente.senha);

    if (!senhaValida) {
      return res.status(401).json({ 
        erro: 'Email ou senha incorretos' 
      });
    }

    // Login bem-sucedido - retornar dados do cliente (sem senha)
    const { senha: _, ...clienteSemSenha } = cliente;
    
    res.json({
      mensagem: 'Login realizado com sucesso!',
      cliente: clienteSemSenha
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;

// POST /api/clientes - Cadastrar novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        erro: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        erro: 'Email inválido' 
      });
    }

    // Validação de senha forte (mínimo 6 caracteres)
    if (senha.length < 6) {
      return res.status(400).json({ 
        erro: 'A senha deve ter no mínimo 6 caracteres' 
      });
    }

    // Verificar se email já existe
    const checkEmailQuery = 'SELECT id FROM clientes WHERE email = ?';
    connection.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao verificar email:', err);
        return res.status(500).json({ erro: 'Erro ao verificar email' });
      }

      if (results.length > 0) {
        return res.status(409).json({ 
          erro: 'Este email já está cadastrado' 
        });
      }

      // Criptografar senha
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);

      // Inserir cliente no banco
      const insertQuery = `
        INSERT INTO clientes (nome, email, senha, telefone) 
        VALUES (?, ?, ?, ?)
      `;
      
      connection.query(
        insertQuery, 
        [nome, email, senhaHash, telefone || null], 
        (err, result) => {
          if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            return res.status(500).json({ 
              erro: 'Erro ao cadastrar cliente' 
            });
          }

          res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso!',
            clienteId: result.insertId
          });
        }
      );
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/clientes - Listar todos os clientes (sem senha)
router.get('/', (req, res) => {
  const query = 'SELECT id, nome, email, telefone, created_at FROM clientes';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      return res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
    res.json(results);
  });
});

// POST /api/clientes/login - Autenticar cliente
router.post('/login', (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação dos campos
    if (!email || !senha) {
      return res.status(400).json({ 
        erro: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar cliente por email
    const query = 'SELECT id, nome, email, telefone, senha FROM clientes WHERE email = ?';
    
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar cliente:', err);
        return res.status(500).json({ erro: 'Erro ao fazer login' });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          erro: 'Email ou senha incorretos' 
        });
      }

      const cliente = results[0];

      // Comparar senha
      const senhaValida = await bcrypt.compare(senha, cliente.senha);

      if (!senhaValida) {
        return res.status(401).json({ 
          erro: 'Email ou senha incorretos' 
        });
      }

      // Login bem-sucedido - retornar dados do cliente (sem senha)
      const { senha: _, ...clienteSemSenha } = cliente;
      
      res.json({
        mensagem: 'Login realizado com sucesso!',
        cliente: clienteSemSenha
      });
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;
