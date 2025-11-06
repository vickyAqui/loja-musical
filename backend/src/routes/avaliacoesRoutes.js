const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/avaliacoes/produto/:produtoId - Listar avaliações de um produto
router.get('/produto/:produtoId', async (req, res) => {
  try {
    const { produtoId } = req.params;
    
    const [avaliacoes] = await db.query(
      `SELECT a.*, c.nome as cliente_nome 
       FROM avaliacoes a
       JOIN clientes c ON a.cliente_id = c.id
       WHERE a.produto_id = ?
       ORDER BY a.data_avaliacao DESC`,
      [produtoId]
    );
    
    // Calcular média de avaliações
    const [media] = await db.query(
      `SELECT AVG(nota) as media, COUNT(*) as total
       FROM avaliacoes
       WHERE produto_id = ?`,
      [produtoId]
    );
    
    res.json({
      avaliacoes,
      media: media[0].media ? parseFloat(media[0].media).toFixed(1) : 0,
      total: media[0].total
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

// POST /api/avaliacoes - Criar nova avaliação
router.post('/', async (req, res) => {
  try {
    const { produto_id, cliente_id, nota, comentario } = req.body;
    
    // Validar nota (1 a 5)
    if (nota < 1 || nota > 5) {
      return res.status(400).json({ error: 'Nota deve ser entre 1 e 5' });
    }
    
    // Verificar se já existe avaliação deste cliente para este produto
    const [existente] = await db.query(
      'SELECT id FROM avaliacoes WHERE produto_id = ? AND cliente_id = ?',
      [produto_id, cliente_id]
    );
    
    if (existente.length > 0) {
      return res.status(400).json({ error: 'Você já avaliou este produto' });
    }
    
    const [result] = await db.query(
      'INSERT INTO avaliacoes (produto_id, cliente_id, nota, comentario) VALUES (?, ?, ?, ?)',
      [produto_id, cliente_id, nota, comentario]
    );
    
    res.status(201).json({ 
      id: result.insertId,
      message: 'Avaliação cadastrada com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
});

// PUT /api/avaliacoes/:id - Atualizar avaliação
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentario, cliente_id } = req.body;
    
    // Validar nota
    if (nota < 1 || nota > 5) {
      return res.status(400).json({ error: 'Nota deve ser entre 1 e 5' });
    }
    
    // Verificar se a avaliação pertence ao cliente
    const [avaliacao] = await db.query(
      'SELECT cliente_id FROM avaliacoes WHERE id = ?',
      [id]
    );
    
    if (avaliacao.length === 0) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    
    if (avaliacao[0].cliente_id !== cliente_id) {
      return res.status(403).json({ error: 'Você não pode editar esta avaliação' });
    }
    
    await db.query(
      'UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id = ?',
      [nota, comentario, id]
    );
    
    res.json({ message: 'Avaliação atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
});

// DELETE /api/avaliacoes/:id - Deletar avaliação
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id } = req.body;
    
    // Verificar se a avaliação pertence ao cliente
    const [avaliacao] = await db.query(
      'SELECT cliente_id FROM avaliacoes WHERE id = ?',
      [id]
    );
    
    if (avaliacao.length === 0) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    
    if (avaliacao[0].cliente_id !== cliente_id) {
      return res.status(403).json({ error: 'Você não pode deletar esta avaliação' });
    }
    
    await db.query('DELETE FROM avaliacoes WHERE id = ?', [id]);
    
    res.json({ message: 'Avaliação removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
});

module.exports = router;
