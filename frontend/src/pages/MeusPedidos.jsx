import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/MeusPedidos.css';

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/api/pedidos/meus-pedidos')
      .then(response => {
        setPedidos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
        setLoading(false);
      });
  }, [usuario, navigate]);

  const getStatusClass = (status) => {
    const classes = {
      'pendente': 'status-pendente',
      'confirmado': 'status-confirmado',
      'enviado': 'status-enviado',
      'entregue': 'status-entregue',
      'cancelado': 'status-cancelado'
    };
    return classes[status] || '';
  };

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
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="meus-pedidos-page">
      <h1>Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="empty-state">
          <p>Você ainda não fez nenhum pedido.</p>
          <button onClick={() => navigate('/instrumentos')} className="btn btn-primary">
            Começar a Comprar
          </button>
        </div>
      ) : (
        <div className="pedidos-lista">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-header">
                <div>
                  <h3>Pedido #{pedido.id}</h3>
                  <p className="pedido-data">
                    {new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`status-badge ${getStatusClass(pedido.status)}`}>
                  {getStatusLabel(pedido.status)}
                </span>
              </div>

              <div className="pedido-info">
                <div className="info-item">
                  <span className="label">Total de itens:</span>
                  <span className="value">{pedido.total_itens}</span>
                </div>
                <div className="info-item">
                  <span className="label">Valor total:</span>
                  <span className="value">R$ {parseFloat(pedido.total).toFixed(2)}</span>
                </div>
              </div>

              {pedido.endereco_entrega && (
                <div className="pedido-endereco">
                  <strong>Endereço de entrega:</strong>
                  <p>{pedido.endereco_entrega}</p>
                </div>
              )}

              <button 
                className="btn btn-secondary"
                onClick={() => navigate(`/pedido/${pedido.id}`)}
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeusPedidos;
