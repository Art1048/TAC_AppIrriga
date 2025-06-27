import React, { useEffect, useState } from 'react';

function NdviMapList() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_NODE_URL + '/ndviMaps')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar NDVI Maps');
        return res.json();
      })
      .then(setMaps)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h2>NDVI Maps</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Data de Captura</th>
          </tr>
        </thead>
        <tbody>
          {maps.map(map => (
            <tr key={map._id}>
              <td>{map._id}</td>
              <td>{map.name}</td>
              <td>{map.description}</td>
              <td>{map.captureDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NdviMapList; 