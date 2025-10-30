import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PedidoConfirmado.css';

const PedidoConfirmado = () => {
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

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!pedido) {
    return (
      <div className="pedido-confirmado-page">
        <div className="alert alert-error">Pedido não encontrado</div>
      </div>
    );
  }

  return (
    <div className="pedido-confirmado-page">
      <div className="sucesso-card">
        <div className="sucesso-icon">✅</div>
        <h1>Pedido Confirmado!</h1>
        <p className="sucesso-mensagem">
          Seu pedido foi realizado com sucesso!
        </p>

        <div className="pedido-info">
          <h2>Detalhes do Pedido</h2>
          <p><strong>Número do Pedido:</strong> #{pedido.id}</p>
          <p><strong>Total:</strong> R$ {parseFloat(pedido.total).toFixed(2)}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
          <p><strong>Data:</strong> {new Date(pedido.data_pedido).toLocaleString('pt-BR')}</p>
        </div>

        <div className="pedido-itens">
          <h3>Itens do Pedido:</h3>
          {pedido.itens.map(item => (
            <div key={item.id} className="item-resumo">
              <span>{item.nome} (x{item.quantidade})</span>
              <span>R$ {parseFloat(item.subtotal).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="acoes">
          <button 
            onClick={() => navigate('/meus-pedidos')}
            className="btn btn-primary"
          >
            Ver Meus Pedidos
          </button>
          <button 
            onClick={() => navigate('/instrumentos')}
            className="btn btn-secondary"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoConfirmado;
