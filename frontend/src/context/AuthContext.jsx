import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar token ao carregar
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      axios.get('http://localhost:3001/api/auth/verificar')
        .then(response => {
          setUsuario(response.data.usuario);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        senha
      });

      const { token, cliente } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUsuario(cliente);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login'
      };
    }
  };

  const cadastrar = async (dadosCliente) => {
    try {
      await axios.post('http://localhost:3001/api/clientes', dadosCliente);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao cadastrar'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cadastrar, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
