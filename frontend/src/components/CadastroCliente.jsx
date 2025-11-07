import { useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiPhone, FiX } from 'react-icons/fi';
import './CadastroCliente.css';

const CadastroCliente = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: ''
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
    // Limpar erro do campo quando começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    // Validar nome
    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

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
    } else if (formData.senha.length < 6) {
      novosErros.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    // Validar confirmação de senha
    if (!formData.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    // Validar telefone (opcional, mas se preenchido deve ter formato válido)
    if (formData.telefone) {
      const telefoneRegex = /^\(?[1-9]{2}\)?[\s]?9?[0-9]{4}-?[0-9]{4}$/;
      if (!telefoneRegex.test(formData.telefone.replace(/\s/g, ''))) {
        novosErros.telefone = 'Telefone inválido (formato: 11999999999)';
      }
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
      const { confirmarSenha, ...dadosEnvio } = formData;
      
      const response = await axios.post('http://localhost:3001/api/clientes', dadosEnvio);
      
      setMensagem({ 
        tipo: 'sucesso', 
        texto: 'Cadastro realizado com sucesso!' 
      });

      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: ''
      });

      // Callback de sucesso
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      
      const mensagemErro = error.response?.data?.erro || 'Erro ao cadastrar. Tente novamente.';
      
      setMensagem({ 
        tipo: 'erro', 
        texto: mensagemErro 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-overlay">
      <div className="cadastro-container">
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>

        <h2>Cadastre-se</h2>
        <p className="cadastro-subtitle">Crie sua conta na Ponte Sonora</p>

        {mensagem.texto && (
          <div className={`mensagem ${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className={errors.nome ? 'error' : ''}
              />
            </div>
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className={errors.senha ? 'error' : ''}
              />
            </div>
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha *</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                className={errors.confirmarSenha ? 'error' : ''}
              />
            </div>
            {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <div className="input-with-icon">
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className={errors.telefone ? 'error' : ''}
              />
            </div>
            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroCliente;
