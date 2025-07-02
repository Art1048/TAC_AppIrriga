import React, { useState } from 'react';

function PessoaForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      const res = await fetch(process.env.REACT_APP_API_JAVA_URL + '/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
      });
      if (!res.ok) throw new Error('Erro ao cadastrar pessoa');
      setMensagem('Pessoa cadastrada com sucesso!');
      setNome('');
      setEmail('');
    } catch (err) {
      setMensagem('Erro: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: <input value={nome} onChange={e => setNome(e.target.value)} required /></label>
        </div>
        <div>
          <label>Email: <input value={email} onChange={e => setEmail(e.target.value)} required /></label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default PessoaForm; 