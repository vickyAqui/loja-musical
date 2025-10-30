import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CarrinhoContext } from '../context/CarrinhoContext';
import '../styles/Instrumentos.css';

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [mensagem, setMensagem] = useState('');

  const { usuario } = useContext(AuthContext);
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/instrumentos')
      .then(response => {
        setInstrumentos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar instrumentos:', error);
        setLoading(false);
      });
  }, []);

  const handleAdicionarCarrinho = async (instrumentoId) => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    const resultado = await adicionarAoCarrinho(instrumentoId, 1);
    
    if (resultado.success) {
      setMensagem('Instrumento adicionado ao carrinho!');
      setTimeout(() => setMensagem(''), 3000);
    } else {
      setMensagem(resultado.error);
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  const categorias = ['todos', ...new Set(instrumentos.map(i => i.categoria).filter(Boolean))];
  
  const instrumentosFiltrados = filtroCategoria === 'todos'
    ? instrumentos
    : instrumentos.filter(i => i.categoria === filtroCategoria);

  if (loading) {
    return <div className="loading">Carregando instrumentos...</div>;
  }

  return (
    <div className="instrumentos-page">
      <div className="page-header">
        <h1>Catálogo de Instrumentos Musicais</h1>
        <p>Encontre o instrumento perfeito para você</p>
      </div>

      {mensagem && <div className="alert alert-info">{mensagem}</div>}

      <div className="filtros">
        <label>Filtrar por categoria:</label>
        <select 
          value={filtroCategoria} 
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="filtro-select"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todos' ? 'Todas as Categorias' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="instrumentos-grid">
        {instrumentosFiltrados.map(instrumento => (
          <div key={instrumento.id} className="instrumento-card">
            <div className="card-image">
              {instrumento.imagem ? (
                <img src={instrumento.imagem} alt={instrumento.nome} />
              ) : (
                <div className="placeholder-image">🎵</div>
              )}
              {instrumento.categoria && (
                <span className="categoria-badge">{instrumento.categoria}</span>
              )}
            </div>
            
            <div className="card-content">
              <h3>{instrumento.nome}</h3>
              <p className="descricao">{instrumento.descricao}</p>
              
              <div className="card-footer">
                <div className="preco-info">
                  <span className="preco">R$ {parseFloat(instrumento.preco).toFixed(2)}</span>
                  <span className="estoque">
                    {instrumento.quantidade > 0 
                      ? `${instrumento.quantidade} em estoque`
                      : 'Indisponível'
                    }
                  </span>
                </div>
                
                <button 
                  onClick={() => handleAdicionarCarrinho(instrumento.id)}
                  disabled={instrumento.quantidade === 0}
                  className="btn btn-primary"
                >
                  {instrumento.quantidade > 0 ? '🛒 Adicionar' : 'Esgotado'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {instrumentosFiltrados.length === 0 && (
        <div className="empty-state">
          <p>Nenhum instrumento encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default Instrumentos;
