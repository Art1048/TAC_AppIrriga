import React, { useState, useContext } from 'react';
import { TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { AuthContext } from '../../App';

function AreaForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: 'success', message: '' });
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: 'success', message: '' });
    setOpen(false);
    try {
      const session = await user.getSignInUserSession();
      const token = session.getIdToken().getJwtToken();
      const res = await fetch(process.env.REACT_APP_API_JAVA_URL + '/areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nome, descricao })
      });
      if (!res.ok) throw new Error('Erro ao cadastrar área');
      setFeedback({ type: 'success', message: 'Área cadastrada com sucesso!' });
      setNome('');
      setDescricao('');
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setOpen(true);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Cadastrar Área</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Cadastrar</Button>
      </form>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={feedback.type} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AreaForm; 