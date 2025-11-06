import { FaStar } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ produto, onClick }) => {
  const renderStars = () => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="star" />
        ))}
      </div>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="product-card" onClick={() => onClick && onClick(produto)}>
      <div className="product-image">
        <img 
          src={produto.imagem_url || 'https://via.placeholder.com/300x300?text=Sem+Imagem'} 
          alt={produto.nome}
        />
      </div>
      
      {renderStars()}
      
      <h3 className="product-name">{produto.nome}</h3>
      
      {produto.marca && (
        <p className="product-brand">{produto.marca}</p>
      )}
      
      <p className="product-price">{formatPrice(produto.preco)}</p>
    </div>
  );
};

export default ProductCard;
