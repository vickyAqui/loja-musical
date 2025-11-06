import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setItensCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
  }, [itensCarrinho]);

  const adicionarAoCarrinho = (produto) => {
    setItensCarrinho(itens => {
      const itemExistente = itens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        // Se já existe, aumenta a quantidade
        return itens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona novo item
        return [...itens, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setItensCarrinho(itens => itens.filter(item => item.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setItensCarrinho(itens =>
      itens.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  const getTotalItens = () => {
    return itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  const getValorTotal = () => {
    return itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const value = {
    itensCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    getTotalItens,
    getValorTotal
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};
