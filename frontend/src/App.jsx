import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCarrinho } from './context/CarrinhoContext';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CadastroCliente from './components/CadastroCliente';
import Login from './components/Login';
import Footer from './components/Footer';
import MeusPedidos from './components/MeusPedidos';
import Carrinho from './components/Carrinho';
import './App.css';

const App = () => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarMeusPedidos, setMostrarMeusPedidos] = useState(false);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [clienteLogado, setClienteLogado] = useState(null);

  useEffect(() => {
    // Verificar se há cliente logado no localStorage
    const clienteSalvo = localStorage.getItem('cliente');
    if (clienteSalvo) {
      setClienteLogado(JSON.parse(clienteSalvo));
    }

    // Buscar produtos
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

  const handleComprarClick = () => {
    if (!clienteLogado) {
      setProdutoSelecionado(null);
      setMostrarLogin(true);
    } else {
      // Adicionar ao carrinho e fechar detalhes
      adicionarAoCarrinho(produtoSelecionado);
      setProdutoSelecionado(null);
      setMostrarCarrinho(true);
    }
  };

  const handleOpenCadastro = () => {
    setMostrarCadastro(true);
  };

  const handleCloseCadastro = () => {
    setMostrarCadastro(false);
  };

  const handleCadastroSucesso = () => {
    setMostrarCadastro(false);
    // Aqui poderia redirecionar para login ou outra ação
  };

  const handleOpenLogin = () => {
    setMostrarLogin(true);
  };

  const handleCloseLogin = () => {
    setMostrarLogin(false);
  };

  const handleLoginSucesso = (cliente) => {
    setClienteLogado(cliente);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    setClienteLogado(null);
  };

  const handleOpenMeusPedidos = () => {
    setMostrarMeusPedidos(true);
  };

  const handleCloseMeusPedidos = () => {
    setMostrarMeusPedidos(false);
  };

  const handleOpenCarrinho = () => {
    setMostrarCarrinho(true);
  };

  const handleCloseCarrinho = () => {
    setMostrarCarrinho(false);
  };

  const handleLoginRequired = () => {
    setMostrarCarrinho(false);
    setMostrarLogin(true);
  };

  return (
    <div className="app">
      <Header 
        onCadastroClick={handleOpenCadastro}
        onLoginClick={handleOpenLogin}
        onMeusPedidosClick={handleOpenMeusPedidos}
        onCarrinhoClick={handleOpenCarrinho}
        clienteLogado={clienteLogado}
        onLogout={handleLogout}
      />
      
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

      <Footer />

      {produtoSelecionado && (
        <ProductDetail 
          produto={produtoSelecionado}
          onBack={handleCloseDetail}
          onComprar={handleComprarClick}
          clienteLogado={clienteLogado}
        />
      )}

      {mostrarCadastro && (
        <CadastroCliente
          onClose={handleCloseCadastro}
          onSuccess={handleCadastroSucesso}
        />
      )}

      {mostrarLogin && (
        <Login
          onClose={handleCloseLogin}
          onSuccess={handleLoginSucesso}
        />
      )}

      {mostrarMeusPedidos && (
        <MeusPedidos
          usuarioLogado={clienteLogado}
          onVoltar={handleCloseMeusPedidos}
        />
      )}

      {mostrarCarrinho && (
        <Carrinho
          isOpen={mostrarCarrinho}
          onClose={handleCloseCarrinho}
          usuarioLogado={clienteLogado}
          onLoginRequired={handleLoginRequired}
        />
      )}
    </div>
  );
};

export default App;
