import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiEye } from 'react-icons/fi';
import './MeusPedidos.css';

function MeusPedidos({ usuarioLogado, onVoltar }) {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuarioLogado && usuarioLogado.id) {
      carregarPedidos();
    }
  }, [usuarioLogado]);

  const carregarPedidos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pedidos/cliente/${usuarioLogado.id}`);
      setPedidos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setLoading(false);
    }
  };

  const carregarDetalhesPedido = async (pedidoId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pedidos/${pedidoId}`);
      setPedidoSelecionado(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes do pedido:', error);
    }
  };

  const cancelarPedido = async (pedidoId) => {
    if (!window.confirm('Deseja realmente cancelar este pedido?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/pedidos/${pedidoId}`);
      alert('Pedido cancelado com sucesso!');
      carregarPedidos();
      setPedidoSelecionado(null);
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      alert('Erro ao cancelar pedido. Verifique se o pedido pode ser cancelado.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aguardando Pagamento':
        return <FiClock className="status-icon aguardando" />;
      case 'Pagamento Confirmado':
        return <FiCheckCircle className="status-icon confirmado" />;
      case 'Em Preparação':
        return <FiPackage className="status-icon preparacao" />;
      case 'Enviado':
        return <FiTruck className="status-icon enviado" />;
      case 'Entregue':
        return <FiCheckCircle className="status-icon entregue" />;
      case 'Cancelado':
        return <FiXCircle className="status-icon cancelado" />;
      default:
        return <FiClock className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, '-');
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

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  if (loading) {
    return <div className="meus-pedidos-loading">Carregando pedidos...</div>;
  }

  return (
    <div className="meus-pedidos-overlay">
      <div className="meus-pedidos-container">
        <div className="meus-pedidos-header">
          <h2>Meus Pedidos</h2>
          <button className="btn-voltar" onClick={onVoltar}>
            ✕ Voltar
          </button>
        </div>

        {pedidos.length === 0 ? (
          <div className="sem-pedidos">
            <FiPackage size={64} />
            <p>Você ainda não fez nenhum pedido.</p>
          </div>
        ) : (
          <div className="pedidos-lista">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-card">
                <div className="pedido-card-header">
                  <div className="pedido-info">
                    <span className="pedido-numero">Pedido #{pedido.id}</span>
                    <span className="pedido-data">{formatarData(pedido.data_pedido)}</span>
                  </div>
                  <div className={`pedido-status ${getStatusClass(pedido.status)}`}>
                    {getStatusIcon(pedido.status)}
                    <span>{pedido.status}</span>
                  </div>
                </div>

                <div className="pedido-card-body">
                  <div className="pedido-detalhes">
                    <p><strong>Valor Total:</strong> {formatarPreco(pedido.valor_total)}</p>
                    <p><strong>Forma de Pagamento:</strong> {pedido.forma_pagamento || 'Não informado'}</p>
                  </div>

                  <div className="pedido-acoes">
                    <button 
                      className="btn-ver-detalhes"
                      onClick={() => carregarDetalhesPedido(pedido.id)}
                    >
                      <FiEye /> Ver Detalhes
                    </button>
                    {pedido.status === 'Aguardando Pagamento' && (
                      <button 
                        className="btn-cancelar"
                        onClick={() => cancelarPedido(pedido.id)}
                      >
                        Cancelar Pedido
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Detalhes do Pedido */}
        {pedidoSelecionado && (
          <div className="pedido-detalhe-overlay" onClick={() => setPedidoSelecionado(null)}>
            <div className="pedido-detalhe-container" onClick={(e) => e.stopPropagation()}>
              <div className="pedido-detalhe-header">
                <h3>Detalhes do Pedido #{pedidoSelecionado.id}</h3>
                <button className="btn-fechar" onClick={() => setPedidoSelecionado(null)}>✕</button>
              </div>

              <div className="pedido-detalhe-info">
                <div className="info-group">
                  <p><strong>Data do Pedido:</strong> {formatarData(pedidoSelecionado.data_pedido)}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${getStatusClass(pedidoSelecionado.status)}`}>
                      {pedidoSelecionado.status}
                    </span>
                  </p>
                </div>

                <div className="info-group">
                  <p><strong>Forma de Pagamento:</strong> {pedidoSelecionado.forma_pagamento || 'Não informado'}</p>
                  <p><strong>Endereço de Entrega:</strong> {pedidoSelecionado.endereco_entrega || 'Não informado'}</p>
                </div>

                {pedidoSelecionado.observacoes && (
                  <div className="info-group">
                    <p><strong>Observações:</strong> {pedidoSelecionado.observacoes}</p>
                  </div>
                )}
              </div>

              <div className="pedido-itens">
                <h4>Itens do Pedido</h4>
                {pedidoSelecionado.itens.map((item) => (
                  <div key={item.id} className="pedido-item">
                    <img src={item.produto_imagem} alt={item.produto_nome} />
                    <div className="item-info">
                      <p className="item-marca">{item.produto_marca}</p>
                      <p className="item-nome">{item.produto_nome}</p>
                      <p className="item-quantidade">Quantidade: {item.quantidade}</p>
                    </div>
                    <div className="item-precos">
                      <p className="item-preco-unit">Unitário: {formatarPreco(item.preco_unitario)}</p>
                      <p className="item-subtotal">Subtotal: {formatarPreco(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pedido-total">
                <h4>Valor Total: {formatarPreco(pedidoSelecionado.valor_total)}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeusPedidos;
