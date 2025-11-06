import { FaStar, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import Toast from './Toast';
import './ProductCard.css';

const ProductCard = ({ produto, onClick }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [mostrarToast, setMostrarToast] = useState(false);
  const renderStars = () => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="star" />
        ))}
        <span className="rating-count">(24)</span>
      </div>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calcularDesconto = () => {
    // Simulando desconto de 10% para demonstração
    const precoOriginal = produto.preco * 1.1;
    return Math.round(((precoOriginal - produto.preco) / precoOriginal) * 100);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    adicionarAoCarrinho(produto);
    setMostrarToast(true);
  };

  const desconto = calcularDesconto();
  const precoOriginal = produto.preco * 1.1;

  return (
    <>
      {mostrarToast && (
        <Toast 
          mensagem={`${produto.nome} adicionado ao carrinho!`}
          onClose={() => setMostrarToast(false)}
        />
      )}
      
      <div className="product-card" onClick={() => onClick && onClick(produto)}>
      <div className="product-card-header">
        {desconto > 0 && (
          <span className="discount-badge">-{desconto}%</span>
        )}
        {produto.preco >= 299 && (
          <span className="free-shipping-badge">
            <FaTruck /> Frete Grátis
          </span>
        )}
      </div>

      <div className="product-image">
        <img 
          src={produto.imagem_url || 'https://via.placeholder.com/300x300?text=Sem+Imagem'} 
          alt={produto.nome}
        />
      </div>
      
      <div className="product-card-content">
        {produto.marca && (
          <p className="product-brand">{produto.marca}</p>
        )}

        <h3 className="product-name">{produto.nome}</h3>
        
        {renderStars()}
        
        <div className="price-section">
          {desconto > 0 && (
            <span className="original-price">{formatPrice(precoOriginal)}</span>
          )}
          <p className="product-price">{formatPrice(produto.preco)}</p>
          <p className="installment">
            em até 10x de {formatPrice(produto.preco / 10)}
          </p>
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <FaShoppingCart /> Adicionar ao Carrinho
        </button>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
