import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario) {
      carregarCarrinho();
    } else {
      setCarrinho([]);
    }
  }, [usuario]);

  const carregarCarrinho = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/carrinho');
      setCarrinho(response.data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = async (instrumentoId, quantidade = 1) => {
    try {
      await axios.post('http://localhost:3001/api/carrinho', {
        instrumento_id: instrumentoId,
        quantidade
      });
      await carregarCarrinho();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao adicionar ao carrinho'
      };
    }
  };

  const atualizarQuantidade = async (itemId, quantidade) => {
    try {
      await axios.put(`http://localhost:3001/api/carrinho/${itemId}`, { quantidade });
      await carregarCarrinho();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar carrinho'
      };
    }
  };

  const removerDoCarrinho = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/api/carrinho/${itemId}`);
      await carregarCarrinho();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao remover do carrinho'
      };
    }
  };

  const limparCarrinho = async () => {
    try {
      await axios.delete('http://localhost:3001/api/carrinho');
      setCarrinho([]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao limpar carrinho'
      };
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      loading,
      adicionarAoCarrinho,
      atualizarQuantidade,
      removerDoCarrinho,
      limparCarrinho,
      carregarCarrinho,
      calcularTotal,
      totalItens
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
