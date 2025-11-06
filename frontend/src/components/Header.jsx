import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
import { GiGuitar, GiMusicalNotes, GiDrum } from 'react-icons/gi';
import { BiDisc } from 'react-icons/bi';
import { MdAlbum } from 'react-icons/md';
import './Header.css';

const Header = ({ onCadastroClick, onLoginClick, onMeusPedidosClick, onCarrinhoClick, onBuscar, clienteLogado, onLogout }) => {
  const { getTotalItens } = useCarrinho();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onBuscar) {
      onBuscar(searchTerm);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Busca em tempo real após 300ms de pausa na digitação
    if (onBuscar) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        onBuscar(value);
      }, 300);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <div className="logo-icon">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="25" fill="#000" />
              <path d="M30 50 Q40 30 50 50 Q60 70 70 50" stroke="#fff" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <h1>Ponte sonora</h1>
        </div>
        
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Buscar por nome ou marca..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              <FiSearch />
            </button>
          </form>
        </div>

        <div className="header-actions">
          {clienteLogado ? (
            <>
              <div className="user-info">
                <FiUser className="user-icon" />
                <span className="user-name">Olá, {clienteLogado.nome.split(' ')[0]}</span>
              </div>
              <button className="pedidos-button" onClick={onMeusPedidosClick} title="Meus Pedidos">
                <FiPackage />
              </button>
              <button className="logout-button" onClick={onLogout} title="Sair">
                <FiLogOut />
              </button>
            </>
          ) : (
            <>
              <button className="user-button" onClick={onLoginClick}>
                <FiUser className="user-icon" />
                <span className="cadastre-text">Entrar</span>
              </button>
              <button className="user-button" onClick={onCadastroClick}>
              <span className="cadastre-text">Cadastre-se</span>
            </button>
          </>
          )}
          <button className="cart-button" onClick={onCarrinhoClick}>
            <FiShoppingCart />
            {getTotalItens() > 0 && (
              <span className="cart-badge">{getTotalItens()}</span>
            )}
          </button>
        </div>
      </div>      <nav className="nav-menu">
        <a href="#lp-vinil" className="nav-item">
          <MdAlbum className="nav-icon" />
          LP/VINIL
        </a>
        <a href="#instrumentos" className="nav-item">
          <GiGuitar className="nav-icon" />
          Instrumentos
        </a>
        <a href="#cd" className="nav-item">
          <BiDisc className="nav-icon" />
          CD
        </a>
        <a href="#diversos" className="nav-item">
          <GiMusicalNotes className="nav-icon" />
          Diversos
        </a>
      </nav>
    </header>
  );
};

export default Header;
