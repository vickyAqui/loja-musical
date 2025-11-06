import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import './App.css';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/instrumentos')
      .then(response => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, []);

  const categoriasMap = {
    'todos': 'Todos os Produtos',
    '1': 'LP/VINIL',
    '2': 'Instrumentos',
    '3': 'CD',
    '4': 'Diversos'
  };

  const produtosFiltrados = categoriaAtiva === 'todos' 
    ? produtos 
    : produtos.filter(p => p.categoria_id === parseInt(categoriaAtiva));

  const handleProductClick = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleCloseDetail = () => {
    setProdutoSelecionado(null);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="hero-section">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920" 
            alt="Banner"
            className="hero-image"
          />
        </div>

        <div className="category-filter">
          <button 
            className={categoriaAtiva === 'todos' ? 'active' : ''}
            onClick={() => setCategoriaAtiva('todos')}
          >
            Todos
          </button>
          {Object.keys(categoriasMap).filter(k => k !== 'todos').map(catId => (
            <button
              key={catId}
              className={categoriaAtiva === catId ? 'active' : ''}
              onClick={() => setCategoriaAtiva(catId)}
            >
              {categoriasMap[catId]}
            </button>
          ))}
        </div>

        <div className="products-container">
          <h2 className="category-title">{categoriasMap[categoriaAtiva]}</h2>
          
          {loading ? (
            <p className="loading">Carregando produtos...</p>
          ) : produtosFiltrados.length === 0 ? (
            <p className="no-products">Nenhum produto encontrado nesta categoria.</p>
          ) : (
            <div className="products-grid">
              {produtosFiltrados.map(produto => (
                <ProductCard 
                  key={produto.id} 
                  produto={produto}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {produtoSelecionado && (
        <ProductDetail 
          produto={produtoSelecionado}
          onBack={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default App;
