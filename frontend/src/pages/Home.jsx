import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>🎵 Bem-vindo à Loja Musical</h1>
          <p className="hero-subtitle">
            Encontre os melhores instrumentos musicais para realizar seus sonhos
          </p>
          <div className="hero-buttons">
            <Link to="/instrumentos" className="btn btn-primary btn-large">
              Ver Catálogo
            </Link>
            <Link to="/cadastro" className="btn btn-secondary btn-large">
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Por que escolher a Loja Musical?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎸</div>
            <h3>Variedade</h3>
            <p>Diversos instrumentos musicais de qualidade</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Fácil Compra</h3>
            <p>Processo de compra simples e seguro</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Entrega Rápida</h3>
            <p>Receba seus instrumentos com agilidade</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Qualidade</h3>
            <p>Produtos selecionados com garantia</p>
          </div>
        </div>
      </section>

      <section className="categorias">
        <h2>Categorias</h2>
        <div className="categorias-grid">
          <div className="categoria-card">
            <h3>🎸 Cordas</h3>
            <p>Violões, guitarras, baixos e violinos</p>
          </div>
          <div className="categoria-card">
            <h3>🥁 Percussão</h3>
            <p>Baterias e instrumentos de percussão</p>
          </div>
          <div className="categoria-card">
            <h3>🎹 Teclas</h3>
            <p>Teclados e pianos digitais</p>
          </div>
          <div className="categoria-card">
            <h3>🎺 Sopro</h3>
            <p>Saxofones, flautas e trompetes</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Comece sua jornada musical hoje!</h2>
        <Link to="/cadastro" className="btn btn-primary btn-large">
          Criar Conta Grátis
        </Link>
      </section>
    </div>
  );
};

export default Home;
