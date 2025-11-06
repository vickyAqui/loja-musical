const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Listar todos os pedidos de um cliente
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { clienteId } = req.params;
    
    const query = `
      SELECT 
        p.id,
        p.data_pedido,
        p.status,
        p.valor_total,
        p.forma_pagamento,
        p.endereco_entrega,
        p.observacoes
      FROM pedidos p
      WHERE p.cliente_id = ?
      ORDER BY p.data_pedido DESC
    `;
    
    const [results] = await db.query(query, [clienteId]);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// GET - Buscar detalhes de um pedido específico (com itens)
router.get('/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;
    
    const queryPedido = `
      SELECT 
        p.*,
        c.nome as cliente_nome,
        c.email as cliente_email
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      WHERE p.id = ?
    `;
    
    const queryItens = `
      SELECT 
        ip.*,
        pr.nome as produto_nome,
        pr.marca as produto_marca,
        pr.imagem as produto_imagem
      FROM itens_pedido ip
      JOIN produtos pr ON ip.produto_id = pr.id
      WHERE ip.pedido_id = ?
    `;
  
    const [pedidoResults] = await db.query(queryPedido, [pedidoId]);
    
    if (pedidoResults.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    const [itensResults] = await db.query(queryItens, [pedidoId]);
    
    const pedido = {
      ...pedidoResults[0],
      itens: itensResults
    };
    
    res.json(pedido);
  } catch (err) {
    console.error('Erro ao buscar pedido:', err);
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// POST - Criar novo pedido
router.post('/', async (req, res) => {
  try {
    const { cliente_id, itens, valor_total, forma_pagamento, endereco_entrega, observacoes } = req.body;
    
    // Validações
    if (!cliente_id || !itens || itens.length === 0 || !valor_total) {
      return res.status(400).json({ error: 'Dados incompletos para criar pedido' });
    }
    
    // Inserir pedido
    const queryPedido = `
      INSERT INTO pedidos (cliente_id, valor_total, forma_pagamento, endereco_entrega, observacoes)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.query(
      queryPedido,
      [cliente_id, valor_total, forma_pagamento, endereco_entrega, observacoes]
    );
    
    const pedidoId = result.insertId;
    
    // Inserir itens do pedido
    const queryItens = `
      INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal)
      VALUES ?
    `;
    
    const itensValues = itens.map(item => [
      pedidoId,
      item.produto_id,
      item.quantidade,
      item.preco_unitario,
      item.quantidade * item.preco_unitario
    ]);
    
    await db.query(queryItens, [itensValues]);
    
    res.status(201).json({
      message: 'Pedido criado com sucesso',
      pedidoId: pedidoId
    });
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// PUT - Atualizar status do pedido
router.put('/:pedidoId/status', async (req, res) => {
  try {
    const { pedidoId } = req.params;
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
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const [result] = await db.query(
      'UPDATE pedidos SET status = ? WHERE id = ?',
      [status, pedidoId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    res.json({ message: 'Status atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// DELETE - Cancelar pedido (soft delete via status)
router.delete('/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;
    
    const [result] = await db.query(
      "UPDATE pedidos SET status = 'Cancelado' WHERE id = ? AND status = 'Aguardando Pagamento'",
      [pedidoId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Pedido não pode ser cancelado' });
    }
    
    res.json({ message: 'Pedido cancelado com sucesso' });
  } catch (err) {
    console.error('Erro ao cancelar pedido:', err);
    res.status(500).json({ error: 'Erro ao cancelar pedido' });
  }
});

module.exports = router;
