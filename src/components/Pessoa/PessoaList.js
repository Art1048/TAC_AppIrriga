import React, { useEffect, useState } from 'react';

function PessoaList() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_JAVA_URL + '/pessoas')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar pessoas');
        return res.json();
      })
      .then(setPessoas)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div className="container">
      <h2>Pessoas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(pessoa => (
            <tr key={pessoa.id}>
              <td>{pessoa.id}</td>
              <td>{pessoa.nome}</td>
              <td>{pessoa.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PessoaList; 