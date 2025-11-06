import React, { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Filtros.css';

function Filtros({ onFiltrosChange, filtrosAtivos }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [secaoAberta, setSecaoAberta] = useState({
    tipo: true,
    preco: true
  });

  const tiposInstrumento = [
    { id: 'cordas', label: 'Cordas', subcategorias: ['Violão', 'Guitarra', 'Baixo', 'Cavaco'] },
    { id: 'percussao', label: 'Percussão', subcategorias: ['Bateria', 'Tambor', 'Pandeiro', 'Cajón'] },
    { id: 'teclas', label: 'Teclas', subcategorias: ['Piano', 'Teclado', 'Órgão', 'Sintetizador'] },
    { id: 'sopro', label: 'Sopro', subcategorias: ['Saxofone', 'Flauta', 'Trompete', 'Clarinete'] }
  ];

  const faixasPreco = [
    { id: 'ate-500', label: 'Até R$ 500', min: 0, max: 500 },
    { id: '500-1000', label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
    { id: '1000-2000', label: 'R$ 1.000 - R$ 2.000', min: 1000, max: 2000 },
    { id: '2000-5000', label: 'R$ 2.000 - R$ 5.000', min: 2000, max: 5000 },
    { id: 'acima-5000', label: 'Acima de R$ 5.000', min: 5000, max: Infinity }
  ];

  const toggleSecao = (secao) => {
    setSecaoAberta(prev => ({
      ...prev,
      [secao]: !prev[secao]
    }));
  };

  const handleTipoChange = (tipo) => {
    const novosTipos = filtrosAtivos.tipos.includes(tipo)
      ? filtrosAtivos.tipos.filter(t => t !== tipo)
      : [...filtrosAtivos.tipos, tipo];
    
    onFiltrosChange({ ...filtrosAtivos, tipos: novosTipos });
  };

  const handlePrecoChange = (faixa) => {
    const novaFaixa = filtrosAtivos.preco?.id === faixa.id ? null : faixa;
    onFiltrosChange({ ...filtrosAtivos, preco: novaFaixa });
  };

  const limparFiltros = () => {
    onFiltrosChange({ tipos: [], preco: null });
  };

  const contarFiltrosAtivos = () => {
    let count = 0;
    if (filtrosAtivos.tipos.length > 0) count += filtrosAtivos.tipos.length;
    if (filtrosAtivos.preco) count += 1;
    return count;
  };

  const filtrosCount = contarFiltrosAtivos();

  return (
    <>
      {/* Botão Mobile */}
      <button 
        className="btn-filtros-mobile"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        <FiFilter />
        Filtros
        {filtrosCount > 0 && <span className="filtros-badge">{filtrosCount}</span>}
      </button>

      {/* Overlay Mobile */}
      {mostrarFiltros && (
        <div className="filtros-overlay" onClick={() => setMostrarFiltros(false)}>
          <div className="filtros-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filtros-header">
              <h3>Filtros</h3>
              <button onClick={() => setMostrarFiltros(false)}>
                <FiX />
              </button>
            </div>
            <div className="filtros-content">
              {renderFiltrosContent()}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Desktop */}
      <aside className="filtros-sidebar">
        <div className="filtros-header-desktop">
          <h3>
            <FiFilter /> Filtros
            {filtrosCount > 0 && <span className="filtros-count">({filtrosCount})</span>}
          </h3>
          {filtrosCount > 0 && (
            <button className="btn-limpar" onClick={limparFiltros}>
              Limpar tudo
            </button>
          )}
        </div>
        {renderFiltrosContent()}
      </aside>
    </>
  );

  function renderFiltrosContent() {
    return (
      <>
        {/* Filtro por Tipo de Instrumento */}
        <div className="filtro-secao">
          <button 
            className="filtro-secao-header"
            onClick={() => toggleSecao('tipo')}
          >
            <span>Tipo de Instrumento</span>
            {secaoAberta.tipo ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {secaoAberta.tipo && (
            <div className="filtro-secao-content">
              {tiposInstrumento.map(tipo => (
                <div key={tipo.id} className="filtro-grupo">
                  <label className="filtro-checkbox">
                    <input
                      type="checkbox"
                      checked={filtrosAtivos.tipos.includes(tipo.id)}
                      onChange={() => handleTipoChange(tipo.id)}
                    />
                    <span>{tipo.label}</span>
                  </label>
                  
                  {filtrosAtivos.tipos.includes(tipo.id) && tipo.subcategorias && (
                    <div className="filtro-subcategorias">
                      {tipo.subcategorias.map(sub => (
                        <span key={sub} className="subcategoria-tag">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filtro por Preço */}
        <div className="filtro-secao">
          <button 
            className="filtro-secao-header"
            onClick={() => toggleSecao('preco')}
          >
            <span>Faixa de Preço</span>
            {secaoAberta.preco ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {secaoAberta.preco && (
            <div className="filtro-secao-content">
              {faixasPreco.map(faixa => (
                <label key={faixa.id} className="filtro-radio">
                  <input
                    type="radio"
                    name="preco"
                    checked={filtrosAtivos.preco?.id === faixa.id}
                    onChange={() => handlePrecoChange(faixa)}
                  />
                  <span>{faixa.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tags de Filtros Ativos */}
        {filtrosCount > 0 && (
          <div className="filtros-ativos">
            <h4>Filtros aplicados:</h4>
            <div className="filtros-tags">
              {filtrosAtivos.tipos.map(tipo => {
                const tipoObj = tiposInstrumento.find(t => t.id === tipo);
                return (
                  <span key={tipo} className="filtro-tag">
                    {tipoObj?.label}
                    <button onClick={() => handleTipoChange(tipo)}>
                      <FiX />
                    </button>
                  </span>
                );
              })}
              {filtrosAtivos.preco && (
                <span className="filtro-tag">
                  {filtrosAtivos.preco.label}
                  <button onClick={() => handlePrecoChange(filtrosAtivos.preco)}>
                    <FiX />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Filtros;
