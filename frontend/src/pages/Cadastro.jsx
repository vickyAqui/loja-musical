import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const { cadastrar } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    // Validações
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setCarregando(true);

    const { confirmarSenha, ...dadosCadastro } = formData;
    const resultado = await cadastrar(dadosCadastro);

    if (resultado.success) {
      setSucesso(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErro(resultado.error);
    }

    setCarregando(false);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastro de Cliente</h2>
        <p className="cadastro-subtitle">Crie sua conta para comprar instrumentos</p>

        {erro && <div className="alert alert-error">{erro}</div>}
        {sucesso && <div className="alert alert-success">Cadastro realizado! Redirecionando...</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Endereço</h3>
            
            <div className="form-group">
              <label>Endereço Completo</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  maxLength="2"
                  placeholder="UF"
                />
              </div>

              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Senha</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Senha *</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div className="form-group">
                <label>Confirmar Senha *</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  placeholder="Digite a senha novamente"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="cadastro-footer">
          Já tem conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
