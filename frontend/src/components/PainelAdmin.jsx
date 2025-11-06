import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChartLine, FaBox, FaUsers, FaShoppingCart, FaTrophy, FaClock, FaSignOutAlt } from 'react-icons/fa';
import './PainelAdmin.css';
import GerenciarProdutos from './GerenciarProdutos';
import GerenciarPedidos from './GerenciarPedidos';
import ListaClientes from './ListaClientes';

function PainelAdmin({ admin, onClose }) {
  const [abaSelecionada, setAbaSelecionada] = useState('dashboard');
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/admin/dashboard');
      setEstatisticas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const renderDashboard = () => {
    if (loading || !estatisticas) {
      return <div className="loading">Carregando estatísticas...</div>;
    }

    return (
      <div className="dashboard-content">
        <div className="stats-cards">
          <div className="stat-card purple">
            <div className="stat-icon">
              <FaBox />
            </div>
            <div className="stat-info">
              <h3>{estatisticas.totalProdutos}</h3>
              <p>Produtos</p>
            </div>
          </div>

          <div className="stat-card blue">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>{estatisticas.totalClientes}</h3>
              <p>Clientes</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-info">
              <h3>{estatisticas.totalPedidos}</h3>
              <p>Pedidos</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>{formatarMoeda(estatisticas.valorVendas)}</h3>
              <p>Vendas Totais</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section top-products">
            <h3><FaTrophy /> Produtos Mais Vendidos</h3>
            <div className="products-list">
              {estatisticas.produtosMaisVendidos.map((produto, index) => (
                <div key={produto.id} className="product-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="product-details">
                    <strong>{produto.nome}</strong>
                    <span className="product-brand">{produto.marca}</span>
                  </div>
                  <span className="product-sales">{produto.total_vendido} vendidos</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section recent-sales">
            <h3><FaClock /> Vendas Recentes</h3>
            <div className="sales-list">
              {estatisticas.vendasRecentes.map((venda) => (
                <div key={venda.id} className="sale-item">
                  <div className="sale-info">
                    <strong>Pedido #{venda.id}</strong>
                    <span className="sale-client">{venda.cliente_nome}</span>
                    <span className="sale-date">{formatarData(venda.data_pedido)}</span>
                  </div>
                  <div className="sale-value">
                    <span className={`status-badge ${venda.status.toLowerCase()}`}>
                      {venda.status}
                    </span>
                    <strong>{formatarMoeda(venda.valor_total)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="painel-admin-overlay">
      <div className="painel-admin-container">
        <header className="painel-header">
          <div className="header-left">
            <h1>Painel Administrativo</h1>
            <p>Bem-vindo, <strong>{admin.nome}</strong></p>
          </div>
          <button className="logout-button" onClick={onClose} title="Sair">
            <FaSignOutAlt /> Sair
          </button>
        </header>

        <nav className="painel-tabs">
          <button
            className={abaSelecionada === 'dashboard' ? 'active' : ''}
            onClick={() => setAbaSelecionada('dashboard')}
          >
            <FaChartLine /> Dashboard
          </button>
          <button
            className={abaSelecionada === 'produtos' ? 'active' : ''}
            onClick={() => setAbaSelecionada('produtos')}
          >
            <FaBox /> Produtos
          </button>
          <button
            className={abaSelecionada === 'pedidos' ? 'active' : ''}
            onClick={() => setAbaSelecionada('pedidos')}
          >
            <FaShoppingCart /> Pedidos
          </button>
          <button
            className={abaSelecionada === 'clientes' ? 'active' : ''}
            onClick={() => setAbaSelecionada('clientes')}
          >
            <FaUsers /> Clientes
          </button>
        </nav>

        <div className="painel-content">
          {abaSelecionada === 'dashboard' && renderDashboard()}
          {abaSelecionada === 'produtos' && <GerenciarProdutos />}
          {abaSelecionada === 'pedidos' && <GerenciarPedidos />}
          {abaSelecionada === 'clientes' && <ListaClientes />}
        </div>
      </div>
    </div>
  );
}

export default PainelAdmin;
