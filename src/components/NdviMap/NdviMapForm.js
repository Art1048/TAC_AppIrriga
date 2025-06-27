import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Snackbar, Alert, Box } from '@mui/material';

function NdviMapForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [captureDate, setCaptureDate] = useState('');
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: 'success', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: 'success', message: '' });
    setOpen(false);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('captureDate', captureDate);
    if (file) formData.append('file', file);
    try {
      const res = await fetch(process.env.REACT_APP_API_NODE_URL + '/ndviMaps', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Erro ao cadastrar NDVI Map');
      setFeedback({ type: 'success', message: 'NDVI Map cadastrado com sucesso!' });
      setName('');
      setDescription('');
      setCaptureDate('');
      setFile(null);
    } catch (err) {
      setFeedback({ type: 'error', message: 'Erro: ' + err.message });
    } finally {
      setOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f6f8fa">
      <Paper sx={{ p: 4, minWidth: 320 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Cadastrar NDVI Map</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Data de Captura"
            type="date"
            value={captureDate}
            onChange={e => setCaptureDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Selecionar Arquivo
            <input
              type="file"
              hidden
              onChange={e => setFile(e.target.files[0])}
              required
            />
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Cadastrar</Button>
        </form>
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={feedback.type} sx={{ width: '100%' }}>
            {feedback.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default NdviMapForm; 