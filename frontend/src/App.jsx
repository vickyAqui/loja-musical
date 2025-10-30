import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import InstrumentosPage from './pages/InstrumentosPage';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import PedidoConfirmado from './pages/PedidoConfirmado';
import MeusPedidos from './pages/MeusPedidos';
import DetalhesPedido from './pages/DetalhesPedido';
import Admin from './pages/Admin';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CarrinhoProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/instrumentos" element={<InstrumentosPage />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido-confirmado/:pedidoId" element={<PedidoConfirmado />} />
                <Route path="/meus-pedidos" element={<MeusPedidos />} />
                <Route path="/pedido/:pedidoId" element={<DetalhesPedido />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>&copy; 2025 Loja Musical. Todos os direitos reservados.</p>
            </footer>
          </div>
        </CarrinhoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
