const express = require('express');
const connection = require('../config/db');
const { verificarToken } = require('./authRoutes');

const router = express.Router();

// Criar novo pedido (S2-R3 - Finalizar Compra)
router.post('/', verificarToken, (req, res) => {
  const clienteId = req.usuario.id;
  const { endereco_entrega, observacoes } = req.body;

  // Buscar itens do carrinho
  const queryCarrinho = `
    SELECT c.instrumento_id, c.quantidade, i.preco, i.quantidade as estoque
    FROM carrinho c
    INNER JOIN instrumentos i ON c.instrumento_id = i.id
    WHERE c.cliente_id = ?
  `;

  connection.query(queryCarrinho, [clienteId], (err, itensCarrinho) => {
    if (err) {
      console.error('Erro ao buscar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao processar pedido' });
    }

    if (itensCarrinho.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // Verificar estoque
    for (const item of itensCarrinho) {
      if (item.quantidade > item.estoque) {
        return res.status(400).json({
          error: `Estoque insuficiente para o instrumento ID ${item.instrumento_id}`
        });
      }
    }

    // Calcular total
    const total = itensCarrinho.reduce((acc, item) => {
      return acc + (item.preco * item.quantidade);
    }, 0);

    // Iniciar transação
    connection.beginTransaction(err => {
      if (err) {
        console.error('Erro ao iniciar transação:', err);
        return res.status(500).json({ error: 'Erro ao processar pedido' });
      }

      // Criar pedido
      const queryPedido = `
        INSERT INTO pedidos (cliente_id, total, endereco_entrega, observacoes)
        VALUES (?, ?, ?, ?)
      `;

      connection.query(
        queryPedido,
        [clienteId, total, endereco_entrega, observacoes],
        (err, resultPedido) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Erro ao criar pedido:', err);
              res.status(500).json({ error: 'Erro ao criar pedido' });
            });
          }

          const pedidoId = resultPedido.insertId;

          // Inserir itens do pedido
          const queryItens = `
            INSERT INTO itens_pedido (pedido_id, instrumento_id, quantidade, preco_unitario, subtotal)
            VALUES ?
          `;

          const valoresItens = itensCarrinho.map(item => [
            pedidoId,
            item.instrumento_id,
            item.quantidade,
            item.preco,
            item.preco * item.quantidade
          ]);

          connection.query(queryItens, [valoresItens], err => {
            if (err) {
              return connection.rollback(() => {
                console.error('Erro ao inserir itens do pedido:', err);
                res.status(500).json({ error: 'Erro ao criar pedido' });
              });
            }

            // Atualizar estoque
            let atualizacoesCompletas = 0;

            itensCarrinho.forEach(item => {
              connection.query(
                'UPDATE instrumentos SET quantidade = quantidade - ? WHERE id = ?',
                [item.quantidade, item.instrumento_id],
                err => {
                  if (err) {
                    return connection.rollback(() => {
                      console.error('Erro ao atualizar estoque:', err);
                      res.status(500).json({ error: 'Erro ao processar pedido' });
                    });
                  }

                  atualizacoesCompletas++;

                  // Se todas as atualizações foram concluídas
                  if (atualizacoesCompletas === itensCarrinho.length) {
                    // Limpar carrinho
                    connection.query(
                      'DELETE FROM carrinho WHERE cliente_id = ?',
                      [clienteId],
                      err => {
                        if (err) {
                          return connection.rollback(() => {
                            console.error('Erro ao limpar carrinho:', err);
                            res.status(500).json({ error: 'Erro ao processar pedido' });
                          });
                        }

                        // Confirmar transação
                        connection.commit(err => {
                          if (err) {
                            return connection.rollback(() => {
                              console.error('Erro ao confirmar transação:', err);
                              res.status(500).json({ error: 'Erro ao processar pedido' });
                            });
                          }

                          res.status(201).json({
                            message: 'Pedido realizado com sucesso',
                            pedidoId,
                            total
                          });
                        });
                      }
                    );
                  }
                }
              );
            });
          });
        }
      );
    });
  });
});

// Buscar pedidos do cliente (S2-R1 - Área do Cliente)
router.get('/meus-pedidos', verificarToken, (req, res) => {
  const clienteId = req.usuario.id;

  const query = `
    SELECT p.id, p.total, p.status, p.data_pedido, p.endereco_entrega,
           COUNT(ip.id) as total_itens
    FROM pedidos p
    LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id
    WHERE p.cliente_id = ?
    GROUP BY p.id
    ORDER BY p.data_pedido DESC
  `;

  connection.query(query, [clienteId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }

    res.json(results);
  });
});

// Buscar detalhes de um pedido específico
router.get('/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const clienteId = req.usuario.id;

  const queryPedido = `
    SELECT * FROM pedidos WHERE id = ? AND cliente_id = ?
  `;

  connection.query(queryPedido, [id, clienteId], (err, resultPedido) => {
    if (err) {
      console.error('Erro ao buscar pedido:', err);
      return res.status(500).json({ error: 'Erro ao buscar pedido' });
    }

    if (resultPedido.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    const pedido = resultPedido[0];

    // Buscar itens do pedido
    const queryItens = `
      SELECT ip.*, i.nome, i.imagem
      FROM itens_pedido ip
      INNER JOIN instrumentos i ON ip.instrumento_id = i.id
      WHERE ip.pedido_id = ?
    `;

    connection.query(queryItens, [id], (err, itens) => {
      if (err) {
        console.error('Erro ao buscar itens do pedido:', err);
        return res.status(500).json({ error: 'Erro ao buscar itens do pedido' });
      }

      res.json({
        ...pedido,
        itens
      });
    });
  });
});

// Listar todos os pedidos (S2-R4 - Gestão de Pedidos - ADMIN)
router.get('/admin/todos', verificarToken, (req, res) => {
  const query = `
    SELECT p.id, p.total, p.status, p.data_pedido,
           c.nome as cliente_nome, c.email as cliente_email,
           COUNT(ip.id) as total_itens
    FROM pedidos p
    INNER JOIN clientes c ON p.cliente_id = c.id
    LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id
    GROUP BY p.id
    ORDER BY p.data_pedido DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }

    res.json(results);
  });
});

// Atualizar status do pedido (S2-R4 - ADMIN)
router.put('/admin/:id/status', verificarToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusValidos = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  connection.query(
    'UPDATE pedidos SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao atualizar status:', err);
        return res.status(500).json({ error: 'Erro ao atualizar status' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json({ message: 'Status atualizado com sucesso' });
    }
  );
});

module.exports = router;
