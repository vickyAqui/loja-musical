import { useState } from 'react';
import { FaUser, FaLock, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './LoginAdmin.css';

const LoginAdmin = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', {
        email,
        senha
      });

      onSuccess(response.data.admin);
      onClose();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-admin-overlay" onClick={onClose}>
      <div className="login-admin-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>🎵 Painel Admin</h2>
        <p className="subtitle">Acesso exclusivo para administradores</p>

        <form onSubmit={handleSubmit} className="login-admin-form">
          {erro && <div className="error-message">{erro}</div>}

          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Email do administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no Painel'}
          </button>
        </form>

        <div className="admin-info">
          <p><strong>Credenciais padrão:</strong></p>
          <p>Email: admin@lojamusical.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
