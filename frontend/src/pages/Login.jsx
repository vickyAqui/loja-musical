import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const resultado = await login(email, senha);

    if (resultado.success) {
      navigate('/instrumentos');
    } else {
      setErro(resultado.error);
    }

    setCarregando(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="login-subtitle">Faça login para comprar instrumentos</p>

        {erro && <div className="alert alert-error">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-footer">
          Não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
