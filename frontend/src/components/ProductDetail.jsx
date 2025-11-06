import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import './ProductDetail.css';

const ProductDetail = ({ produto, onBack, onComprar, clienteLogado }) => {
  const categoriasMap = {
    1: 'LP/VINIL',
    2: 'Instrumentos',
    3: 'CD',
    4: 'Diversos'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = () => {
    return (
      <div className="detail-stars">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="detail-star" />
        ))}
        <span className="rating-text">(5.0)</span>
      </div>
    );
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img 
              src={produto.imagem_url || 'https://via.placeholder.com/500x500?text=Sem+Imagem'} 
              alt={produto.nome}
            />
          </div>

          <div className="product-detail-info">
            <span className="product-category">
              {categoriasMap[produto.categoria_id] || 'Produto'}
            </span>
            
            <h1 className="product-detail-name">{produto.nome}</h1>
            
            {produto.marca && (
              <p className="product-detail-brand">Marca: <strong>{produto.marca}</strong></p>
            )}

            {renderStars()}

            <div className="product-price-section">
              <span className="product-detail-price">{formatPrice(produto.preco)}</span>
              <span className="price-installment">
                ou em até 10x de {formatPrice(produto.preco / 10)}
              </span>
            </div>

            {produto.descricao && (
              <div className="product-description">
                <h3>Descrição</h3>
                <p>{produto.descricao}</p>
              </div>
            )}

            <div className="product-details-list">
              <h3>Especificações</h3>
              <ul>
                <li><strong>Código:</strong> #{produto.id.toString().padStart(6, '0')}</li>
                <li><strong>Categoria:</strong> {categoriasMap[produto.categoria_id]}</li>
                {produto.marca && <li><strong>Marca:</strong> {produto.marca}</li>}
                <li><strong>Disponibilidade:</strong> <span className="in-stock">Em estoque</span></li>
              </ul>
            </div>

            <div className="shipping-info">
              <MdLocalShipping className="shipping-icon" />
              <div>
                <strong>Frete Grátis</strong>
                <p>Para compras acima de R$ 299,00</p>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-button" onClick={onComprar}>
                <FaShoppingCart /> Adicionar ao Carrinho
              </button>
              <button className="buy-now-button" onClick={onComprar}>
                {clienteLogado ? 'Comprar Agora' : 'Faça Login para Comprar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
