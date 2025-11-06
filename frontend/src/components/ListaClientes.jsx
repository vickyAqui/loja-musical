import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import './ListaClientes.css';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/admin/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Carregando clientes...</div>;
  }

  return (
    <div className="lista-clientes">
      <div className="section-header">
        <h2>Clientes Cadastrados</h2>
        <input
          type="text"
          placeholder="Buscar cliente por nome ou email..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="clientes-stats">
        <div className="stat-box">
          <FaUser />
          <div>
            <h3>{clientes.length}</h3>
            <p>Total de Clientes</p>
          </div>
        </div>
        <div className="stat-box">
          <FaShoppingCart />
          <div>
            <h3>{clientes.reduce((sum, c) => sum + (c.total_pedidos || 0), 0)}</h3>
            <p>Total de Pedidos</p>
          </div>
        </div>
        <div className="stat-box">
          <FaMoneyBillWave />
          <div>
            <h3>{formatarMoeda(clientes.reduce((sum, c) => sum + parseFloat(c.total_gasto || 0), 0))}</h3>
            <p>Receita Total</p>
          </div>
        </div>
      </div>

      <div className="clientes-table-container">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cadastrado em</th>
              <th>Pedidos</th>
              <th>Total Gasto</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  Nenhum cliente encontrado
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="cliente-nome">
                    <FaUser className="icon" />
                    {cliente.nome}
                  </td>
                  <td>
                    <FaEnvelope className="icon" />
                    {cliente.email}
                  </td>
                  <td>
                    <FaPhone className="icon" />
                    {cliente.telefone || '-'}
                  </td>
                  <td>{formatarData(cliente.created_at)}</td>
                  <td className="pedidos-count">
                    <span className="badge">{cliente.total_pedidos || 0}</span>
                  </td>
                  <td className="total-gasto">
                    {formatarMoeda(cliente.total_gasto)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaClientes;
