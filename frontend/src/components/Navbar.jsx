import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CarrinhoContext } from '../context/CarrinhoContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const { totalItens } = useContext(CarrinhoContext);
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎵 Loja Musical
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>

        <ul className={`navbar-menu ${menuAberto ? 'active' : ''}`}>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/instrumentos">Instrumentos</Link></li>
          
          {usuario ? (
            <>
              <li>
                <Link to="/carrinho" className="carrinho-link">
                  🛒 Carrinho {totalItens > 0 && <span className="badge">{totalItens}</span>}
                </Link>
              </li>
              <li><Link to="/meus-pedidos">Meus Pedidos</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li>
                <span className="user-info">Olá, {usuario.nome}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro" className="btn-cadastro">Cadastrar</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
