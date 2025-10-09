import { useEffect, useState } from 'react';
import axios from 'axios';

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/instrumentos')
      .then(response => {
        setInstrumentos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar instrumentos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Instrumentos Musicais</h1>
      <ul>
        {instrumentos.map(instrumento => (
          <li key={instrumento.id}>
            <h2>{instrumento.nome}</h2>
            <p>{instrumento.descricao}</p>
            <p>Preço: R${instrumento.preco}</p>
            <p>Quantidade: {instrumento.quantidade}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Instrumentos;
