import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarrinhoContext } from '../context/CarrinhoContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const { carrinho, calcularTotal, carregarCarrinho } = useContext(CarrinhoContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  if (!usuario) {
    return (
      <div className="checkout-page">
        <div className="alert alert-warning">
          Você precisa estar logado para finalizar a compra.
        </div>
      </div>
    );
  }

  if (carrinho.length === 0) {
    return (
      <div className="checkout-page">
        <div className="alert alert-warning">
          Seu carrinho está vazio.
        </div>
        <button onClick={() => navigate('/instrumentos')} className="btn btn-primary">
          Ver Instrumentos
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await axios.post('http://localhost:3001/api/pedidos', {
        endereco_entrega: endereco,
        observacoes
      });

      // Recarregar carrinho (que estará vazio)
      await carregarCarrinho();

      // Redirecionar para página de sucesso
      navigate(`/pedido-confirmado/${response.data.pedidoId}`);
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao finalizar compra');
      setCarregando(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Finalizar Compra</h1>

      {erro && <div className="alert alert-error">{erro}</div>}

      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Informações de Entrega</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Endereço de Entrega *</label>
              <textarea
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
                rows="4"
                placeholder="Digite o endereço completo de entrega"
              />
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows="3"
                placeholder="Alguma observação sobre o pedido?"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-finalizar"
              disabled={carregando}
            >
              {carregando ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        <div className="checkout-resumo">
          <h2>Resumo do Pedido</h2>
          
          <div className="resumo-itens">
            {carrinho.map(item => (
              <div key={item.id} className="resumo-item">
                <span>{item.nome} (x{item.quantidade})</span>
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="resumo-total">
            <span>Total:</span>
            <span>R$ {calcularTotal().toFixed(2)}</span>
          </div>

          <div className="info-pagamento">
            <h3>Forma de Pagamento</h3>
            <p>Pagamento na entrega</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
