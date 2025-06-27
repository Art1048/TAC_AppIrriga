import React, { useEffect, useState } from 'react';

function IrrigadorList() {
  const [irrigadores, setIrrigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_JAVA_URL + '/irrigadorres')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar irrigadores');
        return res.json();
      })
      .then(setIrrigadores)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div className="container">
      <h2>Irrigadores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {irrigadores.map(irrigador => (
            <tr key={irrigador.id}>
              <td>{irrigador.id}</td>
              <td>{irrigador.nome}</td>
              <td>{irrigador.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IrrigadorList; 