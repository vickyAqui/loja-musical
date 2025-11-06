import React, { useState } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { useCarrinho } from '../context/CarrinhoContext';
import './Carrinho.css';

function Carrinho({ isOpen, onClose, usuarioLogado, onLoginRequired }) {
  const { 
    itensCarrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    limparCarrinho,
    getTotalItens,
    getValorTotal
  } = useCarrinho();
  
  const [finalizandoCompra, setFinalizandoCompra] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const adicionarQuantidade = (produtoId) => {
    const item = itensCarrinho.find(i => i.id === produtoId);
    if (item) {
      atualizarQuantidade(produtoId, item.quantidade + 1);
    }
  };

  const diminuirQuantidade = (produtoId) => {
    const item = itensCarrinho.find(i => i.id === produtoId);
    if (item && item.quantidade > 1) {
      atualizarQuantidade(produtoId, item.quantidade - 1);
    }
  };

  const removerItem = (produtoId) => {
    removerDoCarrinho(produtoId);
  };

  const calcularSubtotal = (item) => {
    return item.preco * item.quantidade;
  };

  const handleLimparCarrinho = () => {
    if (window.confirm('Deseja limpar todo o carrinho?')) {
      limparCarrinho();
    }
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const handleFinalizarCompra = async () => {
    if (!usuarioLogado) {
      onLoginRequired();
      return;
    }

    if (itensCarrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    if (!formaPagamento) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    if (!endereco.trim()) {
      alert('Por favor, informe o endereço de entrega.');
      return;
    }

    try {
      setFinalizandoCompra(true);

      // Preparar dados do pedido
      const pedidoData = {
        cliente_id: usuarioLogado.id,
        valor_total: getValorTotal(),
        forma_pagamento: formaPagamento,
        endereco_entrega: endereco,
        observacoes: observacoes || null,
        itens: itensCarrinho.map(item => ({
          produto_id: item.id,
          quantidade: item.quantidade,
          preco_unitario: item.preco
        }))
      };

      // Enviar pedido para o backend
      const response = await axios.post('http://localhost:3001/api/pedidos', pedidoData);

      if (response.status === 201) {
        alert('Pedido realizado com sucesso! Número do pedido: #' + response.data.pedidoId);
        limparCarrinho();
        setFormaPagamento('');
        setEndereco('');
        setObservacoes('');
        onClose();
      }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra. Tente novamente.');
    } finally {
      setFinalizandoCompra(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="carrinho-overlay" onClick={onClose}>
      <div className="carrinho-container" onClick={(e) => e.stopPropagation()}>
        <div className="carrinho-header">
          <div className="header-title">
            <FiShoppingCart className="cart-icon" />
            <h2>Meu Carrinho</h2>
            <span className="badge-count">{getTotalItens()}</span>
          </div>
          <button className="btn-fechar-carrinho" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="carrinho-body">
          {itensCarrinho.length === 0 ? (
            <div className="carrinho-vazio">
              <FiShoppingCart size={64} />
              <p>Seu carrinho está vazio</p>
              <button className="btn-continuar-comprando" onClick={onClose}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="carrinho-itens">
                {itensCarrinho.map((item) => (
                  <div key={item.id} className="carrinho-item">
                    <img src={item.imagem} alt={item.nome} className="item-imagem" />
                    
                    <div className="item-detalhes">
                      <p className="item-marca">{item.marca}</p>
                      <p className="item-nome">{item.nome}</p>
                      <p className="item-preco-unit">{formatarPreco(item.preco)}</p>
                    </div>

                    <div className="item-controles">
                      <div className="quantidade-controles">
                        <button 
                          className="btn-quantidade"
                          onClick={() => diminuirQuantidade(item.id)}
                          disabled={item.quantidade === 1}
                        >
                          <FiMinus />
                        </button>
                        <span className="quantidade-valor">{item.quantidade}</span>
                        <button 
                          className="btn-quantidade"
                          onClick={() => adicionarQuantidade(item.id)}
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <p className="item-subtotal">{formatarPreco(calcularSubtotal(item))}</p>

                      <button 
                        className="btn-remover"
                        onClick={() => removerItem(item.id)}
                        title="Remover item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="carrinho-footer">
                <button className="btn-limpar-carrinho" onClick={handleLimparCarrinho}>
                  <FiTrash2 /> Limpar Carrinho
                </button>

                <div className="carrinho-total">
                  <span>Total:</span>
                  <span className="valor-total">{formatarPreco(getValorTotal())}</span>
                </div>

                {/* Formulário de Finalização */}
                <div className="finalizacao-form">
                  <h3>Finalizar Compra</h3>
                  
                  <div className="form-group">
                    <label>Forma de Pagamento *</label>
                    <select 
                      value={formaPagamento} 
                      onChange={(e) => setFormaPagamento(e.target.value)}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="PIX">PIX</option>
                      <option value="Boleto">Boleto Bancário</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Endereço de Entrega *</label>
                    <textarea 
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Ex: Rua das Flores, 123 - Centro - São Paulo, SP - CEP: 01234-567"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Observações (opcional)</label>
                    <textarea 
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Alguma observação sobre o pedido?"
                      rows="2"
                    />
                  </div>

                  {!usuarioLogado && (
                    <div className="login-aviso">
                      <p>⚠️ Você precisa estar logado para finalizar a compra</p>
                    </div>
                  )}

                  <button 
                    className="btn-finalizar-compra"
                    onClick={handleFinalizarCompra}
                    disabled={finalizandoCompra || !usuarioLogado}
                  >
                    {finalizandoCompra ? 'Processando...' : 'Finalizar Compra'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
