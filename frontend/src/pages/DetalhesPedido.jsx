import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetalhesPedido.css';

const DetalhesPedido = () => {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/pedidos/${pedidoId}`)
      .then(response => {
        setPedido(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar pedido:', error);
        setLoading(false);
      });
  }, [pedidoId]);

  const getStatusLabel = (status) => {
    const labels = {
      'pendente': '⏳ Pendente',
      'confirmado': '✅ Confirmado',
      'enviado': '🚚 Enviado',
      'entregue': '📦 Entregue',
      'cancelado': '❌ Cancelado'
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="loading">Carregando detalhes...</div>;
  }

  if (!pedido) {
    return (
      <div className="detalhes-pedido-page">
        <div className="alert alert-error">Pedido não encontrado</div>
        <button onClick={() => navigate('/meus-pedidos')} className="btn btn-secondary">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="detalhes-pedido-page">
      <button onClick={() => navigate('/meus-pedidos')} className="btn-voltar">
        ← Voltar
      </button>

      <h1>Detalhes do Pedido #{pedido.id}</h1>

      <div className="detalhes-container">
        <div className="detalhes-card">
          <h2>Informações do Pedido</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value">{getStatusLabel(pedido.status)}</span>
            </div>

            <div className="info-item">
              <span className="label">Data do Pedido:</span>
              <span className="value">
                {new Date(pedido.data_pedido).toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="info-item">
              <span className="label">Valor Total:</span>
              <span className="value destaque">R$ {parseFloat(pedido.total).toFixed(2)}</span>
            </div>

            {pedido.endereco_entrega && (
              <div className="info-item full-width">
                <span className="label">Endereço de Entrega:</span>
                <span className="value">{pedido.endereco_entrega}</span>
              </div>
            )}

            {pedido.observacoes && (
              <div className="info-item full-width">
                <span className="label">Observações:</span>
                <span className="value">{pedido.observacoes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="itens-card">
          <h2>Itens do Pedido</h2>
          
          <div className="itens-lista">
            {pedido.itens.map(item => (
              <div key={item.id} className="item">
                <div className="item-info">
                  {item.imagem ? (
                    <img src={item.imagem} alt={item.nome} className="item-image" />
                  ) : (
                    <div className="item-placeholder">🎵</div>
                  )}
                  <div>
                    <h3>{item.nome}</h3>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço unitário: R$ {parseFloat(item.preco_unitario).toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-subtotal">
                  <span>R$ {parseFloat(item.subtotal).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total-final">
            <span>Total:</span>
            <span>R$ {parseFloat(pedido.total).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPedido;
