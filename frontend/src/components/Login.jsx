import { useState } from 'react';
import axios from 'axios';
import { FiMail, FiLock, FiX } from 'react-icons/fi';
import './Login.css';

const Login = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      novosErros.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      novosErros.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.senha) {
      novosErros.senha = 'Senha é obrigatória';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/clientes/login', formData);
      
      // Salvar dados do cliente no localStorage
      localStorage.setItem('cliente', JSON.stringify(response.data.cliente));
      
      setMensagem({ 
        tipo: 'sucesso', 
        texto: 'Login realizado com sucesso!' 
      });

      // Callback de sucesso
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(response.data.cliente);
        }, 1500);
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      const mensagemErro = error.response?.data?.erro || 'Erro ao fazer login. Tente novamente.';
      
      setMensagem({ 
        tipo: 'erro', 
        texto: mensagemErro 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>

        <h2>LOGIN</h2>
        <p className="login-subtitle">Entre com sua conta</p>

        {mensagem.texto && (
          <div className={`mensagem ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Insira o e-mail..."
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Insira a senha..."
                className={errors.senha ? 'error' : ''}
              />
            </div>
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="security-message">
          Seus dados estão protegidos por criptografia de ponta a ponta.
        </p>
      </div>
    </div>
  );
};

export default Login;
