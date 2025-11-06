import { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import axios from 'axios';
import './Avaliacoes.css';

const Avaliacoes = ({ produtoId, clienteLogado }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [media, setMedia] = useState(0);
  const [total, setTotal] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nota, setNota] = useState(0);
  const [notaHover, setNotaHover] = useState(0);
  const [comentario, setComentario] = useState('');
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  useEffect(() => {
    carregarAvaliacoes();
  }, [produtoId]);

  const carregarAvaliacoes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/avaliacoes/produto/${produtoId}`);
      setAvaliacoes(response.data.avaliacoes);
      setMedia(response.data.media);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!clienteLogado) {
      mostrarMensagem('erro', 'Você precisa estar logado para avaliar');
      return;
    }

    if (nota === 0) {
      mostrarMensagem('erro', 'Por favor, selecione uma nota');
      return;
    }

    try {
      if (editando) {
        await axios.put(`http://localhost:3001/api/avaliacoes/${editando}`, {
          nota,
          comentario,
          cliente_id: clienteLogado.id
        });
        mostrarMensagem('sucesso', 'Avaliação atualizada com sucesso!');
      } else {
        await axios.post('http://localhost:3001/api/avaliacoes', {
          produto_id: produtoId,
          cliente_id: clienteLogado.id,
          nota,
          comentario
        });
        mostrarMensagem('sucesso', 'Avaliação cadastrada com sucesso!');
      }
      
      limparFormulario();
      carregarAvaliacoes();
    } catch (error) {
      const mensagemErro = error.response?.data?.error || 'Erro ao salvar avaliação';
      mostrarMensagem('erro', mensagemErro);
    }
  };

  const handleEditar = (avaliacao) => {
    setEditando(avaliacao.id);
    setNota(avaliacao.nota);
    setComentario(avaliacao.comentario || '');
    setMostrarFormulario(true);
  };

  const handleDeletar = async (id) => {
    if (!confirm('Tem certeza que deseja remover esta avaliação?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/avaliacoes/${id}`, {
        data: { cliente_id: clienteLogado.id }
      });
      mostrarMensagem('sucesso', 'Avaliação removida com sucesso!');
      carregarAvaliacoes();
    } catch (error) {
      const mensagemErro = error.response?.data?.error || 'Erro ao remover avaliação';
      mostrarMensagem('erro', mensagemErro);
    }
  };

  const limparFormulario = () => {
    setNota(0);
    setComentario('');
    setMostrarFormulario(false);
    setEditando(null);
  };

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000);
  };

  const renderStars = (rating, interactive = false, size = 'normal') => {
    const stars = [];
    const starClass = size === 'large' ? 'star-large' : 'star';
    
    for (let i = 1; i <= 5; i++) {
      const isFilled = interactive 
        ? (notaHover >= i || (!notaHover && nota >= i))
        : i <= rating;
      
      stars.push(
        <span
          key={i}
          className={`${starClass} ${interactive ? 'interactive' : ''}`}
          onClick={() => interactive && setNota(i)}
          onMouseEnter={() => interactive && setNotaHover(i)}
          onMouseLeave={() => interactive && setNotaHover(0)}
        >
          {isFilled ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return stars;
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const jaAvaliou = avaliacoes.some(a => a.cliente_id === clienteLogado?.id);

  return (
    <div className="avaliacoes-container">
      <div className="avaliacoes-header">
        <h3>Avaliações</h3>
        <div className="avaliacoes-resumo">
          <div className="media-avaliacoes">
            <span className="numero-media">{media}</span>
            <div className="estrelas-media">
              {renderStars(Math.round(media))}
            </div>
            <span className="total-avaliacoes">({total} {total === 1 ? 'avaliação' : 'avaliações'})</span>
          </div>
        </div>
      </div>

      {mensagem.texto && (
        <div className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      {clienteLogado && !jaAvaliou && !mostrarFormulario && (
        <button 
          className="btn-avaliar"
          onClick={() => setMostrarFormulario(true)}
        >
          Avaliar este produto
        </button>
      )}

      {mostrarFormulario && (
        <form className="form-avaliacao" onSubmit={handleSubmit}>
          <h4>{editando ? 'Editar Avaliação' : 'Avaliar Produto'}</h4>
          
          <div className="form-group">
            <label>Sua nota:</label>
            <div className="estrelas-input">
              {renderStars(nota, true, 'large')}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Comentário (opcional):</label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Compartilhe sua experiência com este produto..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-enviar">
              {editando ? 'Atualizar' : 'Enviar'} Avaliação
            </button>
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={limparFormulario}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="lista-avaliacoes">
        {avaliacoes.length === 0 ? (
          <p className="sem-avaliacoes">Ainda não há avaliações para este produto.</p>
        ) : (
          avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="avaliacao-item">
              <div className="avaliacao-header-item">
                <div className="usuario-info">
                  <FaUser className="user-icon" />
                  <span className="usuario-nome">{avaliacao.cliente_nome}</span>
                </div>
                <div className="avaliacao-meta">
                  <div className="estrelas">
                    {renderStars(avaliacao.nota)}
                  </div>
                  <span className="data">{formatarData(avaliacao.data_avaliacao)}</span>
                </div>
              </div>
              
              {avaliacao.comentario && (
                <p className="comentario">{avaliacao.comentario}</p>
              )}

              {clienteLogado?.id === avaliacao.cliente_id && (
                <div className="avaliacao-acoes">
                  <button 
                    className="btn-icon"
                    onClick={() => handleEditar(avaliacao)}
                    title="Editar avaliação"
                  >
                    <FaEdit /> Editar
                  </button>
                  <button 
                    className="btn-icon btn-deletar"
                    onClick={() => handleDeletar(avaliacao.id)}
                    title="Remover avaliação"
                  >
                    <FaTrash /> Remover
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Avaliacoes;
