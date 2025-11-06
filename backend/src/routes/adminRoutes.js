const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

// POST /api/admin/login - Login de administrador
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const [results] = await db.query(
      'SELECT id, nome, email, senha FROM administradores WHERE email = ?',
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const admin = results[0];
    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const { senha: _, ...adminSemSenha } = admin;

    res.json({
      mensagem: 'Login realizado com sucesso!',
      admin: adminSemSenha
    });
  } catch (error) {
    console.error('Erro no login admin:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/admin/dashboard - Estatísticas do dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Total de produtos
    const [totalProdutos] = await db.query('SELECT COUNT(*) as total FROM produtos');
    
    // Total de clientes
    const [totalClientes] = await db.query('SELECT COUNT(*) as total FROM clientes');
    
    // Total de pedidos
    const [totalPedidos] = await db.query('SELECT COUNT(*) as total FROM pedidos');
    
    // Valor total de vendas
    const [valorVendas] = await db.query('SELECT SUM(valor_total) as total FROM pedidos WHERE status != "Cancelado"');
    
    // Pedidos por status
    const [pedidosPorStatus] = await db.query(`
      SELECT status, COUNT(*) as quantidade 
      FROM pedidos 
      GROUP BY status
    `);
    
    // Produtos mais vendidos
    const [produtosMaisVendidos] = await db.query(`
      SELECT 
        p.id,
        p.nome,
        p.imagem_url,
        SUM(ip.quantidade) as total_vendido,
        SUM(ip.subtotal) as valor_total
      FROM itens_pedido ip
      JOIN produtos p ON ip.produto_id = p.id
      JOIN pedidos pd ON ip.pedido_id = pd.id
      WHERE pd.status != 'Cancelado'
      GROUP BY p.id, p.nome, p.imagem_url
      ORDER BY total_vendido DESC
      LIMIT 5
    `);

    // Vendas recentes
    const [vendasRecentes] = await db.query(`
      SELECT 
        p.id,
        p.data_pedido,
        p.valor_total,
        p.status,
        c.nome as cliente_nome
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.data_pedido DESC
      LIMIT 10
    `);

    res.json({
      resumo: {
        totalProdutos: totalProdutos[0].total,
        totalClientes: totalClientes[0].total,
        totalPedidos: totalPedidos[0].total,
        valorVendas: valorVendas[0].total || 0
      },
      pedidosPorStatus,
      produtosMaisVendidos,
      vendasRecentes
    });
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error);
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard' });
  }
});

// GET /api/admin/produtos - Listar todos os produtos (admin)
router.get('/produtos', async (req, res) => {
  try {
    const [produtos] = await db.query(`
      SELECT p.*, c.nome as categoria_nome 
      FROM produtos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// POST /api/admin/produtos - Criar novo produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, marca, preco, categoria_id, descricao, imagem_url } = req.body;

    if (!nome || !preco || !categoria_id) {
      return res.status(400).json({ erro: 'Nome, preço e categoria são obrigatórios' });
    }

    const [result] = await db.query(
      'INSERT INTO produtos (nome, marca, preco, categoria_id, descricao, imagem_url) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, marca, preco, categoria_id, descricao, imagem_url]
    );

    res.status(201).json({
      mensagem: 'Produto criado com sucesso!',
      id: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
});

// PUT /api/admin/produtos/:id - Atualizar produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, marca, preco, categoria_id, descricao, imagem_url } = req.body;

    const [result] = await db.query(
      'UPDATE produtos SET nome = ?, marca = ?, preco = ?, categoria_id = ?, descricao = ?, imagem_url = ? WHERE id = ?',
      [nome, marca, preco, categoria_id, descricao, imagem_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
});

// DELETE /api/admin/produtos/:id - Deletar produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
});

// GET /api/admin/pedidos - Listar todos os pedidos
router.get('/pedidos', async (req, res) => {
  try {
    const [pedidos] = await db.query(`
      SELECT 
        p.*,
        c.nome as cliente_nome,
        c.email as cliente_email
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.data_pedido DESC
    `);
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
});

// PUT /api/admin/pedidos/:id/status - Atualizar status do pedido
router.put('/pedidos/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = [
      'Aguardando Pagamento',
      'Pagamento Confirmado',
      'Em Preparação',
      'Enviado',
      'Entregue',
      'Cancelado'
    ];

    if (!statusValidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const [result] = await db.query(
      'UPDATE pedidos SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    res.json({ mensagem: 'Status atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
});

// GET /api/admin/clientes - Listar todos os clientes
router.get('/clientes', async (req, res) => {
  try {
    const [clientes] = await db.query(`
      SELECT 
        c.id,
        c.nome,
        c.email,
        c.telefone,
        c.created_at,
        COUNT(DISTINCT p.id) as total_pedidos,
        COALESCE(SUM(p.valor_total), 0) as total_gasto
      FROM clientes c
      LEFT JOIN pedidos p ON c.id = p.cliente_id AND p.status != 'Cancelado'
      GROUP BY c.id, c.nome, c.email, c.telefone, c.created_at
      ORDER BY c.created_at DESC
    `);
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
});

module.exports = router;
