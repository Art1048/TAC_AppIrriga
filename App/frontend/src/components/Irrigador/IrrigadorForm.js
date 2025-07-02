import React, { useState } from 'react';

function IrrigadorForm() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      const res = await fetch(process.env.REACT_APP_API_JAVA_URL + '/irrigadorres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, tipo })
      });
      if (!res.ok) throw new Error('Erro ao cadastrar irrigador');
      setMensagem('Irrigador cadastrado com sucesso!');
      setNome('');
      setTipo('');
    } catch (err) {
      setMensagem('Erro: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Irrigador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: <input value={nome} onChange={e => setNome(e.target.value)} required /></label>
        </div>
        <div>
          <label>Tipo: <input value={tipo} onChange={e => setTipo(e.target.value)} required /></label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default IrrigadorForm; 