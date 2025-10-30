import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const Admin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = () => {
    axios.get('http://localhost:3001/api/pedidos/admin/todos')
      .then(response => {
        setPedidos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
        setLoading(false);
      });
  };

  const atualizarStatus = async (pedidoId, novoStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/pedidos/admin/${pedidoId}/status`, {
        status: novoStatus
      });

      setMensagem('Status atualizado com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
      
      carregarPedidos();
    } catch (error) {
      setMensagem('Erro ao atualizar status');
      setTimeout(() => setMensagem(''), 3000);
    }
  };

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

  if (loading) {
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Gestão de Pedidos</h1>
      <p className="admin-subtitle">Painel administrativo para gerenciar os pedidos da loja</p>

      {mensagem && <div className="alert alert-success">{mensagem}</div>}

      <div className="pedidos-admin">
        {pedidos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="pedidos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Data</th>
                  <th>Itens</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.cliente_nome}</td>
                    <td>{pedido.cliente_email}</td>
                    <td>
                      {new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td>{pedido.total_itens}</td>
                    <td>R$ {parseFloat(pedido.total).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(pedido.status)}`}>
                        {pedido.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={pedido.status}
                        onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregue">Entregue</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total de Pedidos</h3>
          <p className="stat-value">{pedidos.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pendentes</h3>
          <p className="stat-value">
            {pedidos.filter(p => p.status === 'pendente').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Entregues</h3>
          <p className="stat-value">
            {pedidos.filter(p => p.status === 'entregue').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
