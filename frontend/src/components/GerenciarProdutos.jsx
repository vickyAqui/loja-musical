import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import './GerenciarProdutos.css';

function GerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [erro, setErro] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    preco: '',
    categoria_id: '',
    descricao: '',
    imagem_url: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [produtosRes, categoriasRes] = await Promise.all([
        axios.get('http://localhost:3001/api/admin/produtos'),
        axios.get('http://localhost:3001/api/instrumentos/categorias')
      ]);
      setProdutos(produtosRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNovo = () => {
    setProdutoEditando(null);
    setFormData({
      nome: '',
      marca: '',
      preco: '',
      categoria_id: '',
      descricao: '',
      imagem_url: ''
    });
    setErro('');
    setMostrarModal(true);
  };

  const abrirModalEditar = (produto) => {
    setProdutoEditando(produto);
    setFormData({
      nome: produto.nome,
      marca: produto.marca,
      preco: produto.preco,
      categoria_id: produto.categoria_id,
      descricao: produto.descricao || '',
      imagem_url: produto.imagem_url || ''
    });
    setErro('');
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!formData.nome || !formData.marca || !formData.preco || !formData.categoria_id) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (produtoEditando) {
        await axios.put(`http://localhost:3001/api/admin/produtos/${produtoEditando.id}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/admin/produtos', formData);
      }
      
      await carregarDados();
      setMostrarModal(false);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErro('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/admin/produtos/${id}`);
      await carregarDados();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto');
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="gerenciar-produtos">
      <div className="section-header">
        <h2>Gerenciar Produtos</h2>
        <button className="btn-novo" onClick={abrirModalNovo}>
          <FaPlus /> Novo Produto
        </button>
      </div>

      <div className="produtos-table-container">
        <table className="produtos-table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>
                  <img 
                    src={produto.imagem_url || '/placeholder.png'} 
                    alt={produto.nome}
                    className="produto-thumb"
                  />
                </td>
                <td>{produto.nome}</td>
                <td>{produto.marca}</td>
                <td>{produto.categoria_nome}</td>
                <td className="preco">{formatarMoeda(produto.preco)}</td>
                <td className="acoes">
                  <button 
                    className="btn-editar" 
                    onClick={() => abrirModalEditar(produto)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-excluir" 
                    onClick={() => handleDelete(produto.id)}
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{produtoEditando ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button className="btn-fechar" onClick={() => setMostrarModal(false)}>
                <FaTimes />
              </button>
            </div>

            {erro && <div className="error-message">{erro}</div>}

            <form onSubmit={handleSubmit} className="produto-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Marca *</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$) *</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Categoria *</label>
                  <select
                    name="categoria_id"
                    value={formData.categoria_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  name="imagem_url"
                  value={formData.imagem_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Descrição detalhada do produto..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  <FaSave /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarProdutos;
