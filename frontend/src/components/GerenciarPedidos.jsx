import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaUser, FaCalendar, FaMoneyBillWave } from 'react-icons/fa';
import './GerenciarPedidos.css';

function GerenciarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('todos');

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/admin/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/admin/pedidos/${pedidoId}/status`, {
        status: novoStatus
      });
      await carregarPedidos();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do pedido');
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pedidosFiltrados = filtroStatus === 'todos'
    ? pedidos
    : pedidos.filter(p => p.status.toLowerCase() === filtroStatus.toLowerCase());

  if (loading) {
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="gerenciar-pedidos">
      <div className="section-header">
        <h2>Gerenciar Pedidos</h2>
        <div className="filtros-status">
          <button
            className={filtroStatus === 'todos' ? 'active' : ''}
            onClick={() => setFiltroStatus('todos')}
          >
            Todos ({pedidos.length})
          </button>
          <button
            className={filtroStatus === 'aguardando' ? 'active' : ''}
            onClick={() => setFiltroStatus('aguardando')}
          >
            Aguardando ({pedidos.filter(p => p.status === 'Aguardando').length})
          </button>
          <button
            className={filtroStatus === 'enviado' ? 'active' : ''}
            onClick={() => setFiltroStatus('enviado')}
          >
            Enviados ({pedidos.filter(p => p.status === 'Enviado').length})
          </button>
          <button
            className={filtroStatus === 'entregue' ? 'active' : ''}
            onClick={() => setFiltroStatus('entregue')}
          >
            Entregues ({pedidos.filter(p => p.status === 'Entregue').length})
          </button>
        </div>
      </div>

      <div className="pedidos-lista">
        {pedidosFiltrados.length === 0 ? (
          <div className="empty-state">
            <FaShoppingCart />
            <p>Nenhum pedido encontrado</p>
          </div>
        ) : (
          pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-header">
                <div className="pedido-info">
                  <h3>Pedido #{pedido.id}</h3>
                  <div className="pedido-detalhes">
                    <span><FaUser /> {pedido.cliente_nome}</span>
                    <span><FaCalendar /> {formatarData(pedido.data_pedido)}</span>
                    <span><FaMoneyBillWave /> {formatarMoeda(pedido.valor_total)}</span>
                  </div>
                </div>
                <div className="pedido-status">
                  <span className={`status-badge ${pedido.status.toLowerCase()}`}>
                    {pedido.status}
                  </span>
                  <select
                    value={pedido.status}
                    onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Aguardando">Aguardando</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="pedido-itens">
                <h4>Itens do Pedido:</h4>
                <ul>
                  {pedido.itens && JSON.parse(pedido.itens).map((item, index) => (
                    <li key={index}>
                      {item.quantidade}x {item.nome} - {formatarMoeda(item.preco)}
                    </li>
                  ))}
                </ul>
              </div>

              {pedido.endereco_entrega && (
                <div className="pedido-endereco">
                  <h4>Endereço de Entrega:</h4>
                  <p>{pedido.endereco_entrega}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GerenciarPedidos;
