import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Carrinho.css';

const Carrinho = () => {
  const { carrinho, loading, atualizarQuantidade, removerDoCarrinho, calcularTotal } = useContext(CarrinhoContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <div className="carrinho-page">
        <div className="alert alert-warning">
          Você precisa estar logado para acessar o carrinho.
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Carregando carrinho...</div>;
  }

  const handleQuantidadeChange = async (itemId, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    await atualizarQuantidade(itemId, novaQuantidade);
  };

  const handleRemover = async (itemId) => {
    if (confirm('Deseja remover este item do carrinho?')) {
      await removerDoCarrinho(itemId);
    }
  };

  const handleFinalizarCompra = () => {
    navigate('/checkout');
  };

  if (carrinho.length === 0) {
    return (
      <div className="carrinho-page">
        <h1>Carrinho de Compras</h1>
        <div className="empty-cart">
          <p>🛒 Seu carrinho está vazio</p>
          <button onClick={() => navigate('/instrumentos')} className="btn btn-primary">
            Ver Instrumentos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-page">
      <h1>Carrinho de Compras</h1>

      <div className="carrinho-container">
        <div className="carrinho-itens">
          {carrinho.map(item => (
            <div key={item.id} className="carrinho-item">
              <div className="item-image">
                {item.imagem ? (
                  <img src={item.imagem} alt={item.nome} />
                ) : (
                  <div className="placeholder-image">🎵</div>
                )}
              </div>

              <div className="item-info">
                <h3>{item.nome}</h3>
                <p className="item-preco">R$ {parseFloat(item.preco).toFixed(2)}</p>
                <p className="item-estoque">Estoque: {item.estoque}</p>
              </div>

              <div className="item-quantidade">
                <button 
                  onClick={() => handleQuantidadeChange(item.id, item.quantidade - 1)}
                  disabled={item.quantidade <= 1}
                >
                  -
                </button>
                <span>{item.quantidade}</span>
                <button 
                  onClick={() => handleQuantidadeChange(item.id, item.quantidade + 1)}
                  disabled={item.quantidade >= item.estoque}
                >
                  +
                </button>
              </div>

              <div className="item-subtotal">
                <p className="subtotal-valor">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>

              <button 
                className="btn-remover"
                onClick={() => handleRemover(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="carrinho-resumo">
          <h2>Resumo do Pedido</h2>
          
          <div className="resumo-item">
            <span>Subtotal:</span>
            <span>R$ {calcularTotal().toFixed(2)}</span>
          </div>

          <div className="resumo-item">
            <span>Frete:</span>
            <span>A calcular</span>
          </div>

          <div className="resumo-total">
            <span>Total:</span>
            <span>R$ {calcularTotal().toFixed(2)}</span>
          </div>

          <button 
            className="btn btn-primary btn-finalizar"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/instrumentos')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
